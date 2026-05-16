<script setup>
const tareas = ref([])
const nuevaTarea = ref('')
const editandoId = ref(null)
const editandoTexto = ref('')
const filtro = ref('todas')

const total = computed(() => tareas.value.length)
const completadas = computed(() => tareas.value.filter(t => t.completada).length)
const porcentaje = computed(() => total.value > 0 ? Math.round(completadas.value / total.value * 100) : 0)

const filtradas = computed(() => {
  if (filtro.value === 'favoritas') return tareas.value.filter(t => t.favorita)
  if (filtro.value === 'completadas') return tareas.value.filter(t => t.completada)
  if (filtro.value === 'pendientes') return tareas.value.filter(t => !t.completada)
  return tareas.value
})

async function cargar() {
  tareas.value = await $fetch('/api/tareas')
}

async function agregar() {
  if (!nuevaTarea.value.trim()) return
  const tarea = await $fetch('/api/tareas', { method: 'POST', body: { titulo: nuevaTarea.value } })
  tareas.value.push(tarea)
  nuevaTarea.value = ''
}

async function eliminar(id) {
  await $fetch(`/api/tareas/${id}`, { method: 'DELETE' })
  tareas.value = tareas.value.filter(t => t.id !== id)
}

async function toggleFav(id) {
  const t = await $fetch(`/api/tareas/${id}`, { method: 'PATCH', params: { campo: 'favorita' } })
  const i = tareas.value.findIndex(x => x.id === id)
  if (i !== -1) tareas.value[i] = t
}

async function toggleComp(id) {
  const t = await $fetch(`/api/tareas/${id}`, { method: 'PATCH', params: { campo: 'completada' } })
  const i = tareas.value.findIndex(x => x.id === id)
  if (i !== -1) tareas.value[i] = t
}

function editar(t) {
  editandoId.value = t.id
  editandoTexto.value = t.titulo
}

async function guardar(id) {
  if (!editandoTexto.value.trim()) return
  const t = await $fetch(`/api/tareas/${id}`, { method: 'PUT', body: { titulo: editandoTexto.value } })
  const i = tareas.value.findIndex(x => x.id === id)
  if (i !== -1) tareas.value[i] = t
  editandoId.value = null
  editandoTexto.value = ''
}

function cancelar() {
  editandoId.value = null
  editandoTexto.value = ''
}

onMounted(cargar)
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="bento-grid">
      
      <div class="bento-sidebar">
        
        <div class="bento-box stats-box">
          <div class="stats-header">
            <h2>Progreso</h2>
            <span class="counter-pill">{{ completadas }} / {{ total }}</span>
          </div>
          <div class="circular-progress-wrap">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: porcentaje + '%' }"></div>
            </div>
            <p class="progress-text">{{ porcentaje }}% Completado</p>
          </div>
        </div>

        <div class="bento-box add-box">
          <h3>Nueva Tarea</h3>
          <div class="input-group">
            <input v-model="nuevaTarea" @keyup.enter="agregar" placeholder="Escribe aquí..." />
            <button @click="agregar" class="btn-add">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>

        <div class="bento-box filters-box">
          <h3>Filtros</h3>
          <div class="filter-chips">
            <button v-for="f in [{k:'todas',l:'Todas'},{k:'pendientes',l:'Pendientes'},{k:'completadas',l:'Hechas'},{k:'favoritas',l:'⭐ Favoritas'}]" 
                    :key="f.k" 
                    :class="['chip', { active: filtro === f.k }]" 
                    @click="filtro = f.k">
              {{ f.l }}
            </button>
          </div>
        </div>
      </div>

      <div class="bento-main">
        <div class="bento-box list-box">
          <div class="list-header">
            <h2>Directorio de Tareas</h2>
          </div>
          
          <ul class="bento-list">
            <li v-for="t in filtradas" :key="t.id" :class="['bento-item', { done: t.completada, fav: t.favorita }]">
              
              <template v-if="editandoId === t.id">
                <input v-model="editandoTexto" @keyup.enter="guardar(t.id)" class="edit-input" />
                <div class="edit-controls">
                  <button @click="guardar(t.id)" class="btn-save">Guardar</button>
                  <button @click="cancelar" class="btn-cancel">X</button>
                </div>
              </template>
              
              <template v-else>
                <div class="item-content" @click="toggleComp(t.id)">
                  <div :class="['bento-checkbox', { checked: t.completada }]"></div>
                  <span class="item-title">{{ t.titulo }}</span>
                </div>
                
                <div class="item-actions">
                  <button @click.stop="toggleFav(t.id)" :class="['btn-action btn-fav', { 'is-fav': t.favorita }]">⭐</button>
                  <button @click.stop="editar(t)" class="btn-action btn-edit">✏️</button>
                  <button @click.stop="eliminar(t.id)" class="btn-action btn-delete">🗑️</button>
                </div>
              </template>
            </li>
          </ul>

          <div v-if="filtradas.length === 0" class="empty-state">
            <div class="empty-circle"></div>
            <p>Lista vacía.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }

body {
  background-color: #E8EAED;
  color: #2C3E50;
  min-height: 100vh;
  padding: 20px;
}

.dashboard-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}

.bento-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  max-width: 1100px;
  width: 100%;
}

.bento-box {
  background: #FFFFFF;
  border-radius: 28px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.bento-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h2, h3 {
  font-weight: 700;
  margin-bottom: 16px;
  color: #1A202C;
}
h2 { font-size: 1.4rem; }
h3 { font-size: 1.1rem; }

/* Stats Box */
.stats-box { background: #1A202C; color: #FFFFFF; }
.stats-box h2 { color: #FFFFFF; margin-bottom: 0; }
.stats-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.counter-pill { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; }
.progress-bar-bg { height: 12px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
.progress-bar-fill { height: 100%; background: #4ADE80; transition: width 0.5s ease; border-radius: 10px; }
.progress-text { font-size: 0.9rem; color: #A0AEC0; font-weight: 500; }

/* Add Box */
.input-group { display: flex; gap: 12px; }
.input-group input {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #E2E8F0;
  border-radius: 16px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.input-group input:focus { border-color: #3B82F6; }
.btn-add {
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 16px;
  width: 50px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, background 0.2s;
}
.btn-add:hover { background: #2563EB; transform: scale(1.05); }
.btn-add svg { width: 24px; height: 24px; }

/* Filters Box */
.filter-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip {
  background: #F1F5F9;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}
.chip:hover { background: #E2E8F0; }
.chip.active { background: #3B82F6; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }

/* Main List Box */
.bento-main { display: flex; flex-direction: column; }
.list-box { flex: 1; display: flex; flex-direction: column; }
.list-header { margin-bottom: 24px; border-bottom: 2px solid #F1F5F9; padding-bottom: 16px; }

.bento-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.bento-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #F8FAFC;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.bento-item:hover { background: #FFFFFF; border-color: #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); transform: translateX(4px); }

.bento-item.done { opacity: 0.7; }
.bento-item.done .item-title { text-decoration: line-through; color: #94A3B8; }
.bento-item.fav { border-left: 4px solid #F59E0B; }

.item-content { display: flex; align-items: center; gap: 16px; flex: 1; cursor: pointer; }
.bento-checkbox {
  width: 24px; height: 24px;
  border: 2px solid #CBD5E1;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative;
}
.bento-checkbox.checked { background: #4ADE80; border-color: #4ADE80; }
.bento-checkbox.checked::after {
  content: '✓'; color: white; font-weight: bold;
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
}

.item-title { font-weight: 600; font-size: 1.05rem; }

.item-actions { display: flex; gap: 8px; opacity: 0; transition: opacity 0.2s; }
.bento-item:hover .item-actions { opacity: 1; }

.btn-action {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  width: 36px; height: 36px;
  border-radius: 10px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.btn-action:hover { background: #F1F5F9; transform: scale(1.1); }
.btn-fav.is-fav { background: #FEF3C7; border-color: #FDE68A; }

.edit-input { flex: 1; padding: 10px 14px; border: 2px solid #3B82F6; border-radius: 10px; margin-right: 12px; font-size: 1rem; outline: none; }
.edit-controls { display: flex; gap: 8px; }
.btn-save { background: #4ADE80; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.btn-cancel { background: #EF4444; color: white; border: none; padding: 8px 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }

/* Empty State */
.empty-state { text-align: center; padding: 60px 20px; color: #94A3B8; }
.empty-circle { width: 60px; height: 60px; background: #F1F5F9; border-radius: 50%; margin: 0 auto 16px; }

/* Responsive */
@media (max-width: 800px) {
  .bento-grid { grid-template-columns: 1fr; }
  .item-actions { opacity: 1; }
}
</style>