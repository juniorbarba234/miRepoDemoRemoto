<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings cyber-module">
    <h1 class="neon-title">> {{ msg }} _</h1>
    <h3>
      ENTORNO DE DESARROLLO INICIALIZADO CON
      <a href="https://vite.dev/" target="_blank" rel="noopener">VITE</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">VUE 3</a>.
    </h3>
  </div>
</template>

<style scoped>
.greetings {
  text-align: center;
  margin-bottom: 2rem;
}

.neon-title {
  font-weight: 900;
  font-size: 2.6rem;
  color: #fff;
  text-shadow: 2px 2px 0px #00ffcc, -2px -2px 0px #ff00ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

h3 {
  font-size: 1rem;
  color: #aaa;
  letter-spacing: 1px;
}

a {
  color: #ff00ff;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

a:hover {
  color: #00ffcc;
  text-shadow: 0 0 8px #00ffcc;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
</style>