const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { pool, initDB } = require('./database/db');

let win;

function createWindow() {

  win = new BrowserWindow({
    width: 1200,
    height: 800,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }

  });

  win.loadFile(
    path.join(__dirname, 'src/index.html')
  );

}

app.whenReady().then(async () => {

  await initDB();

  createWindow();

});

// =========================
// GRUPOS
// =========================

ipcMain.handle('grupos:listar', async () => {

  const [rows] = await pool.query(
    'SELECT * FROM grupos ORDER BY created_at DESC'
  );

  return rows;

});

ipcMain.handle('grupos:crear', async (_, nombre) => {

  const [r] = await pool.query(
    'INSERT INTO grupos (nombre) VALUES (?)',
    [nombre]
  );

  return {
    id: r.insertId,
    nombre
  };

});

ipcMain.handle('grupos:actualizar', async (_, data) => {

  await pool.query(
    'UPDATE grupos SET nombre = ? WHERE id = ?',
    [data.nombre, data.id]
  );

  return data;

});

ipcMain.handle('grupos:eliminar', async (_, id) => {

  await pool.query(
    'DELETE FROM grupos WHERE id = ?',
    [id]
  );

  return { success: true };

});

// =========================
// ALUMNOS
// =========================

ipcMain.handle('alumnos:crear', async (_, data) => {

  const [r] = await pool.query(
    'INSERT INTO alumnos (grupo_id, nombre) VALUES (?, ?)',
    [data.grupo_id, data.nombre]
  );

  return {
    id: r.insertId,
    ...data
  };

});

ipcMain.handle('alumnos:actualizar', async (_, data) => {

  await pool.query(
    'UPDATE alumnos SET nombre = ? WHERE id = ?',
    [data.nombre, data.id]
  );

  return data;

});

ipcMain.handle('alumnos:eliminar', async (_, id) => {

  await pool.query(
    'DELETE FROM alumnos WHERE id = ?',
    [id]
  );

  return { success: true };

});

// =========================
// ASISTENCIAS
// =========================

ipcMain.handle('asistencias:listar', async (_, data) => {

  const [rows] = await pool.query(`

    SELECT
      a.id,
      a.nombre,
      COALESCE(s.presente, 0) AS presente

    FROM alumnos a

    LEFT JOIN asistencias s
      ON a.id = s.alumno_id
      AND s.fecha = ?

    WHERE a.grupo_id = ?

    ORDER BY a.nombre

  `, [data.fecha, data.grupo_id]);

  return rows;

});

ipcMain.handle('asistencias:marcar', async (_, data) => {

  await pool.query(`

    INSERT INTO asistencias (
      alumno_id,
      fecha,
      presente
    )

    VALUES (?, ?, ?)

    ON DUPLICATE KEY UPDATE
      presente = VALUES(presente)

  `, [
    data.alumno_id,
    data.fecha,
    data.presente
  ]);

  return { success: true };

});

ipcMain.handle('asistencias:dashboard', async (_, grupo_id) => {

  const [total] = await pool.query(
    'SELECT COUNT(*) AS c FROM alumnos WHERE grupo_id = ?',
    [grupo_id]
  );

  const totalAlumnos = total[0].c;

  const [rows] = await pool.query(`

    SELECT
      a.id,
      a.nombre,

      COUNT(s.id) AS total_clases,

      SUM(s.presente) AS presentes,

      ROUND(
        SUM(s.presente) /
        NULLIF(COUNT(s.id),0) * 100,
        1
      ) AS porcentaje

    FROM alumnos a

    LEFT JOIN asistencias s
      ON a.id = s.alumno_id

    WHERE a.grupo_id = ?

    GROUP BY a.id

    ORDER BY porcentaje ASC

  `, [grupo_id]);

  const [fechas] = await pool.query(`

    SELECT DISTINCT fecha

    FROM asistencias

    WHERE alumno_id IN (
      SELECT id
      FROM alumnos
      WHERE grupo_id = ?
    )

    ORDER BY fecha

  `, [grupo_id]);

  return {
    alumnos: rows,
    totalAlumnos,
    fechas
  };

});