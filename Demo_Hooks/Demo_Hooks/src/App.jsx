import UsaHook from './UsaHook.jsx' 
import { UsaHookEffect } from './UsaHookEffect.jsx'
import { MuestraPokemon } from './MuestraPokemon.jsx'
import './App.css'

function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">PANEL DE CONTROL CENTRAL</h1>
        <p className="dashboard-subtitle">SISTEMA EN LÍNEA</p>
      </header>

      <main className="modules-grid">
        <section className="cyber-panel">
          <h2 className="panel-title"> RELOJ_DEL_SISTEMA</h2>
          <UsaHookEffect />
        </section>

        <section className="cyber-panel">
          <h2 className="panel-title"> MÓDULO_CONTADOR</h2>
          <UsaHook />
        </section>

        <section className="cyber-panel">
          <h2 className="panel-title"> BASE_DE_DATOS_PKMN</h2>
          <MuestraPokemon />
        </section>
      </main>
    </div>
  )
}

export default App