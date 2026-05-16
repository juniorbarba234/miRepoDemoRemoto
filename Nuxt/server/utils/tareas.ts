export const tareas = [
  { id: 1, titulo: 'Revisar métricas de la semana 📊', completada: false, favorita: true },
  { id: 2, titulo: 'Preparar presentación de diseño 🎨', completada: true, favorita: false },
  { id: 3, titulo: 'Actualizar repositorio de código 💻', completada: false, favorita: false }
]

const estado = { nextId: 4 }

export function getNextId() {
  return estado.nextId++
}