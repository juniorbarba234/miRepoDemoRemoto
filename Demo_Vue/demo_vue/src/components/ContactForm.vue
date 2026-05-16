<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  setTimeout(() => { submitted.value = false; name.value = ''; email.value = ''; }, 5000);
}
</script>

<template>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit" class="cyber-form">
      <div class="input-group">
        <label for="name">> USUARIO_</label>
        <input 
          id="name" 
          v-model="name" 
          type="text" 
          placeholder="INGRESAR DATOS..."
          required 
        />
      </div>

      <div class="input-group">
        <label for="email">> RED_COM_</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          placeholder="CORREO@SISTEMA.COM"
          required 
        />
      </div>

      <button type="submit" class="submit-btn">EJECUTAR PROTOCOLO</button>
    </form>

    <div v-if="submitted" class="sys-message">
      <p class="status-ok">[OK] DATOS TRANSFERIDOS CON ÉXITO</p>
      <p>> ID: {{ name }}</p>
      <p>> COM: {{ email }}</p>
    </div>
  </div>
</template>

<style scoped>
.cyber-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group label {
  display: block;
  color: #00ffcc;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  color: #fff;
  padding: 1rem;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #ff00ff;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}

.input-group input::placeholder {
  color: #555;
}

.submit-btn {
  background: rgba(255, 0, 255, 0.1);
  border: 1px solid #ff00ff;
  color: #ff00ff;
  padding: 1rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #ff00ff;
  color: #000;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
}

.sys-message {
  margin-top: 2rem;
  padding: 1rem;
  border-left: 4px solid #00ffcc;
  background: rgba(0, 255, 204, 0.05);
  animation: scanline 0.5s ease-out;
}

.status-ok {
  color: #00ffcc;
  font-weight: bold;
  margin-bottom: 1rem;
}

.sys-message p {
  margin: 0.5rem 0;
  color: #ccc;
  font-size: 0.9rem;
}

@keyframes scanline {
  0% { opacity: 0; transform: translateX(-10px); }
  100% { opacity: 1; transform: translateX(0); }
}
</style>