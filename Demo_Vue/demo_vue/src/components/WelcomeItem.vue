<template>
  <div class="item data-log">
    <i class="icon-wrapper">
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3 class="log-heading">
        <slot name="heading"></slot>
      </h3>
      <div class="log-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-log {
  display: flex;
  margin-bottom: 1.5rem;
  background: rgba(0, 255, 204, 0.03);
  border-left: 3px solid #00ffcc;
  padding: 1rem;
  transition: all 0.3s ease;
}

.data-log:hover {
  background: rgba(0, 255, 204, 0.1);
  transform: translateX(5px);
}

.icon-wrapper {
  display: flex;
  place-items: center;
  place-content: center;
  width: 40px;
  color: #ff00ff;
  margin-right: 1rem;
}

.details {
  flex: 1;
}

.log-heading {
  font-size: 1.1rem;
  font-weight: bold;
  color: #00ffcc;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.log-content {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>