<script setup>
defineProps({
  name: { type: String, required: true },
  image: { type: String, required: true },
  types: { type: Array, default: () => [] },
  number: { type: [String, Number], default: '' }
})

const typeColors = {
  grass: '#00ffcc', poison: '#ff00ff', fire: '#ff4400',
  water: '#0088ff', electric: '#fcee0a', psychic: '#ff00aa',
  flying: '#88aaff', bug: '#aaff00', normal: '#cccccc',
  ground: '#ddaa55', rock: '#aa9944', dragon: '#5533ff',
  steel: '#aabbaa', ice: '#00ffff', ghost: '#6644aa', fighting: '#dd3322'
}
</script>

<template>
  <div class="data-card">
    <div class="card-glitch-layer"></div>
    <div class="card-header">
      <span class="file-id">SYS_ID_{{ number }}</span>
    </div>
    
    <div class="hologram-container">
      <img :src="image" :alt="name" class="holo-image" />
    </div>

    <div class="card-info">
      <h3 class="subject-name">{{ name }}</h3>
      <div class="type-tags">
        <span 
          v-for="type in types" 
          :key="type" 
          class="tag"
          :style="{ color: typeColors[type] || '#fff', borderColor: typeColors[type] || '#fff' }"
        >
          {{ type }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-card {
  background: rgba(5, 5, 10, 0.9);
  border: 1px solid #333;
  width: 200px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.data-card:hover {
  border-color: #00ffcc;
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.2);
  transform: translateY(-5px);
}

.card-header {
  background: #111;
  padding: 0.5rem;
  border-bottom: 1px solid #333;
  text-align: right;
}

.file-id {
  font-size: 0.7rem;
  color: #888;
  letter-spacing: 1px;
}

.hologram-container {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 255, 204, 0.05),
    rgba(0, 255, 204, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
  position: relative;
}

.holo-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 10px rgba(0, 255, 204, 0.5));
  transition: transform 0.3s;
}

.data-card:hover .holo-image {
  transform: scale(1.1);
}

.card-info {
  padding: 1rem;
  border-top: 1px solid #333;
}

.subject-name {
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  font-size: 1.1rem;
  color: #fff;
  letter-spacing: 1px;
}

.type-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid;
  text-transform: uppercase;
  background: rgba(0,0,0,0.5);
}
</style>