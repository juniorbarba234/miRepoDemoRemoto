<template>
  <div class="pokemon-card">

    <img :src="imagen" :alt="nombre">

    <h2>{{ nombre }}</h2>

    <p><strong>Tipo:</strong> {{ tipo }}</p>

    <p><strong>Nivel:</strong> {{ nivel }}</p>

  </div>
</template>

<script>
export default {
  props: {
    nombre: String,
    tipo: String,
    nivel: Number,
    imagen: String
  }
}
</script>

<style>
.pokemon-card {
  background: #f1f2f6;
  padding: 20px;
  border-radius: 12px;
}

.pokemon-card img {
  width: 140px;
}

.pokemon-card h2 {
  color: #e17055;
}
</style>