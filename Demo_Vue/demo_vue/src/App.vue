<script setup>
import { ref, computed } from 'vue'
import ContactForm from './components/ContactForm.vue'
import PokemonCard from './components/PokemonCard.vue'

const count = ref(0)

const pokemonList = [
  {
    name: 'bulbasaur',
    number: '001',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison']
  },
  {
    name: 'charmander',
    number: '004',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    types: ['fire']
  },
  {
    name: 'squirtle',
    number: '007',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    types: ['water']
  }
]

const isEven = computed(() => count.value % 2 === 0)
</script>

<template>
  <div class="app-dashboard">
    <header class="cyber-header">
      <h1 class="glitch" data-text="SISTEMA CENTRAL">SISTEMA CENTRAL</h1>
      <p class="subtitle">Panel de Control en Línea</p>
    </header>

    <main class="dashboard-grid">
      <section class="panel cyber-panel counter-panel">
        <h2 class="panel-title">MÓDULO: CONTADOR</h2>
        <div class="counter-display">
          <span class="count-value" :class="{ 'text-cyan': isEven, 'text-magenta': !isEven }">
            {{ count }}
          </span>
          <div class="cyber-buttons">
            <button class="cy-btn cy-btn-danger" @click="count--">DECREMENTAR</button>
            <button class="cy-btn cy-btn-success" @click="count++">INCREMENTAR</button>
          </div>
        </div>
      </section>

      <section class="panel cyber-panel form-panel">
        <h2 class="panel-title">MÓDULO: CONTACTO</h2>
        <ContactForm />
      </section>

      <section class="panel cyber-panel full-width">
        <h2 class="panel-title">BASE DE DATOS: POKÉMON</h2>
        <div class="pokemon-grid">
          <PokemonCard
            v-for="pokemon in pokemonList"
            :key="pokemon.number"
            :name="pokemon.name"
            :image="pokemon.image"
            :types="pokemon.types"
            :number="pokemon.number"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-dashboard {
  min-height: 100vh;
  background-color: #050505;
  background-image: 
    linear-gradient(rgba(0, 255, 204, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 204, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  padding: 2rem;
  box-sizing: border-box;
}

.cyber-header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #00ffcc;
  padding-bottom: 1rem;
  box-shadow: 0 10px 20px -10px rgba(0, 255, 204, 0.3);
}

.glitch {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ffcc;
  margin: 0;
  letter-spacing: 4px;
}

.subtitle {
  color: #00ffcc;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid #333;
  padding: 2rem;
  position: relative;
}

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: linear-gradient(90deg, #00ffcc, #ff00ff);
}

.full-width {
  grid-column: 1 / -1;
}

.panel-title {
  font-size: 1.2rem;
  color: #ff00ff;
  border-bottom: 1px dashed #444;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.count-value {
  font-size: 6rem;
  font-weight: bold;
  text-shadow: 0 0 20px currentColor;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
}

.text-cyan { color: #00ffcc; }
.text-magenta { color: #ff00ff; }

.cyber-buttons {
  display: flex;
  gap: 1rem;
}

.cy-btn {
  background: transparent;
  border: 1px solid currentColor;
  padding: 0.8rem 1.5rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s ease;
}

.cy-btn-danger { color: #ff003c; }
.cy-btn-danger:hover { background: #ff003c; color: #000; box-shadow: 0 0 15px #ff003c; }

.cy-btn-success { color: #00ffcc; }
.cy-btn-success:hover { background: #00ffcc; color: #000; box-shadow: 0 0 15px #00ffcc; }

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

@media (max-width: 800px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}
</style>