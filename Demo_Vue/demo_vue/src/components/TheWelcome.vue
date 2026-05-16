<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <div class="welcome-container">
    <WelcomeItem>
      <template #icon><DocumentationIcon /></template>
      <template #heading>Documentación Oficial</template>
      La <a href="https://vuejs.org/" target="_blank" rel="noopener">documentación oficial</a> de Vue te proporciona toda la información necesaria.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon><ToolingIcon /></template>
      <template #heading>Herramientas de Sistema</template>
      Proyecto servido con <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. IDE recomendado: <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>.
      <br />
      Instrucciones extra en <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a>.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon><EcosystemIcon /></template>
      <template #heading>Ecosistema</template>
      Librerías oficiales: <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>, <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>, y <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon><CommunityIcon /></template>
      <template #heading>Red de Comunicaciones</template>
      ¿Problemas? Conecta con <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a> o síguenos en <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon><SupportIcon /></template>
      <template #heading>Soporte Energético</template>
      Puedes ayudar a mantener la red <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">convirtiéndote en sponsor</a>.
    </WelcomeItem>
  </div>
</template>

<style scoped>
.welcome-container a {
  color: #ff00ff;
  text-decoration: none;
  font-weight: bold;
}

.welcome-container a:hover {
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
}

code {
  background: rgba(255, 0, 255, 0.2);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
}
</style>