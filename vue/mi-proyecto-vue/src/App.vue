<template>
  <div class="contenedor">

    <!-- CONTADOR -->
    <section class="caja">
      <h1>Control de Contador</h1>

      <h2>{{ numero }}</h2>

      <button @click="sumar">
        +
      </button>

      <button @click="restar">
        -
      </button>
    </section>

    <!-- FORMULARIO -->
    <section class="caja">
      <h1>Registro Usuario</h1>

      <input
        type="text"
        v-model="usuario"
        placeholder="Escribe tu nombre"
      />

      <input
        type="email"
        v-model="email"
        placeholder="Escribe tu correo"
      />

      <div class="resultado">
        <p><strong>Usuario:</strong> {{ usuario }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>
    </section>

    <!-- TARJETA POKEMON -->
    <section class="caja">
      <h1>Información Pokémon</h1>

      <PokemonCard
        nombre="Squirtle"
        tipo="Agua"
        :nivel="75"
        imagen="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
      />
    </section>

  </div>
</template>

<script>
import PokemonCard from './components/PokemonCard.vue'

export default {
  components: {
    PokemonCard
  },

  data() {
    return {
      numero: 0,
      usuario: '',
      email: ''
    }
  },

  methods: {
    sumar() {
      this.numero++
    },

    restar() {
      this.numero--
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: #dfe6e9;
  font-family: Verdana, sans-serif;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
}

.caja {
  width: 360px;
  background: white;
  margin: 20px;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}

h1 {
  color: #0984e3;
}

h2 {
  font-size: 45px;
}

button {
  padding: 10px 18px;
  margin: 10px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background: #0984e3;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #74b9ff;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
}

.resultado {
  margin-top: 20px;
}
</style>