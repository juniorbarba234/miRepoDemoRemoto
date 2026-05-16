const sistema = {

  grupoActual: null,

  grupos: [],

  fechaSeleccionada: obtenerFechaActual()

};

// =========================
// FECHA ACTUAL
// =========================

function obtenerFechaActual() {

  return new Date()
    .toISOString()
    .split('T')[0];

}

// =========================
// CARGAR GRUPOS
// =========================

async function cargarGrupos() {

  sistema.grupos =
    await window.api.grupos.listar();

  const lista =
    document.getElementById('grupos-list');

  lista.innerHTML =
    sistema.grupos.map(grupo => `

      <li
        data-id="${grupo.id}"
        class="${
          sistema.grupoActual === grupo.id
            ? 'activo'
            : ''
        }"
      >

        <div class="grupo-info">
          ${grupo.nombre}
        </div>

        <button
          class="btn-remove"
          data-id="${grupo.id}"
        >
          ✖
        </button>

      </li>

    `).join('');

  // ABRIR GRUPO
  lista.querySelectorAll('.grupo-info')
  .forEach(item => {

    item.addEventListener('click', () => {

      const id = Number(
        item.parentElement.dataset.id
      );

      abrirGrupo(id);

    });

  });

  // ELIMINAR GRUPO
  lista.querySelectorAll('.btn-remove')
  .forEach(btn => {

    btn.addEventListener(
      'click',
      async e => {

        e.stopPropagation();

        const id = Number(btn.dataset.id);

        if (!confirm('¿Eliminar grupo?'))
          return;

        await window.api.grupos.eliminar(id);

        if (sistema.grupoActual === id) {

          sistema.grupoActual = null;

          document.getElementById(
            'vista-grupo'
          ).style.display = 'none';

          document.getElementById(
            'seleccionar-grupo'
          ).style.display = 'flex';

        }

        cargarGrupos();

      }
    );

  });

}

// =========================
// ABRIR GRUPO
// =========================

async function abrirGrupo(id) {

  sistema.grupoActual = id;

  sistema.fechaSeleccionada =
    document.getElementById(
      'fecha-asistencia'
    ).value || obtenerFechaActual();

  const grupo =
    sistema.grupos.find(
      g => g.id === id
    );

  document.getElementById(
    'grupo-titulo'
  ).textContent = grupo.nombre;

  document.getElementById(
    'seleccionar-grupo'
  ).style.display = 'none';

  document.getElementById(
    'vista-grupo'
  ).style.display = 'block';

  cargarGrupos();

  cargarAsistencias();

  cargarDashboard();

}

// =========================
// MODAL
// =========================

function mostrarModal(
  titulo,
  contenido,
  accion
) {

  document.getElementById(
    'modal-title'
  ).textContent = titulo;

  document.getElementById(
    'modal-body'
  ).innerHTML = contenido;

  document.getElementById(
    'modal-overlay'
  ).style.display = 'flex';

  const btnOk =
    document.getElementById('modal-ok');

  const btnCancel =
    document.getElementById(
      'modal-cancel'
    );

  btnOk.onclick = () => {

    accion();

    cerrarModal();

  };

  btnCancel.onclick = cerrarModal;

}

function cerrarModal() {

  document.getElementById(
    'modal-overlay'
  ).style.display = 'none';

}

// =========================
// NUEVO GRUPO
// =========================

document.getElementById(
  'btn-nuevo-grupo'
).addEventListener('click', () => {

  mostrarModal(

    'Crear Grupo',

    `
      <input
        id="input-grupo"
        placeholder="Nombre del grupo"
      >
    `,

    async () => {

      const nombre =
        document.getElementById(
          'input-grupo'
        ).value.trim();

      if (!nombre) return;

      await window.api.grupos.crear(
        nombre
      );

      cargarGrupos();

    }

  );

});

// =========================
// EDITAR GRUPO
// =========================

document.getElementById(
  'btn-editar-grupo'
).addEventListener('click', () => {

  const grupo =
    sistema.grupos.find(
      g => g.id === sistema.grupoActual
    );

  mostrarModal(

    'Editar Grupo',

    `
      <input
        id="input-grupo"
        value="${grupo.nombre}"
      >
    `,

    async () => {

      const nombre =
        document.getElementById(
          'input-grupo'
        ).value.trim();

      if (!nombre) return;

      await window.api.grupos.actualizar(
        grupo.id,
        nombre
      );

      cargarGrupos();

      abrirGrupo(grupo.id);

    }

  );

});

// =========================
// ELIMINAR GRUPO
// =========================

document.getElementById(
  'btn-eliminar-grupo'
).addEventListener('click', async () => {

  if (!confirm(
    '¿Eliminar grupo completo?'
  )) return;

  await window.api.grupos.eliminar(
    sistema.grupoActual
  );

  sistema.grupoActual = null;

  document.getElementById(
    'vista-grupo'
  ).style.display = 'none';

  document.getElementById(
    'seleccionar-grupo'
  ).style.display = 'flex';

  cargarGrupos();

});

// =========================
// FECHA
// =========================

document.getElementById(
  'fecha-asistencia'
).value = obtenerFechaActual();

document.getElementById(
  'fecha-asistencia'
).addEventListener('change', e => {

  sistema.fechaSeleccionada =
    e.target.value;

  cargarAsistencias();

});

// =========================
// CARGAR ASISTENCIAS
// =========================

async function cargarAsistencias() {

  if (!sistema.grupoActual) return;

  const alumnos =
    await window.api.asistencias.listar(
      sistema.grupoActual,
      sistema.fechaSeleccionada
    );

  const tbody =
    document.getElementById(
      'asistencia-body'
    );

  tbody.innerHTML =
    alumnos.map((alumno, index) => `

      <tr>

        <td>${index + 1}</td>

        <td>${alumno.nombre}</td>

        <td>

          <button
            class="switch ${
              alumno.presente
                ? 'activo'
                : ''
            }"

            data-id="${alumno.id}"
          ></button>

        </td>

        <td>

          <button
            class="btn-icon editar"
            data-id="${alumno.id}"
            data-nombre="${alumno.nombre}"
          >
            Editar
          </button>

          <button
            class="btn-icon borrar"
            data-id="${alumno.id}"
          >
            Eliminar
          </button>

        </td>

      </tr>

    `).join('');

}