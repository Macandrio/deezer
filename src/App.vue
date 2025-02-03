<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Menu from "./components/menu.vue";
import Reproductor from './components/Reproductor.vue';
</script>



<template>
  <div id="app">
    <!-- Header -->
    <header class="bg-primary text-white py-3">
      <div class="container text-center">
        <h1><router-link class="navbar-brand" to="/">🎵 Deezer Music Client</router-link></h1>
      </div>
    </header>

    <!-- Menu -->
    <Menu />

    <!-- Contenedor para centrar el reproductor -->
    <div class="reproductor-container">
      <h1>Mi Reproductor de Música</h1>
      <Reproductor />
    </div>

    <!-- Main Content -->
    <main class="container my-4">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Deezer Music Client. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>





<style lang="scss">
nav {
  border: 1px solid gray;
}
$hover-bg-color: #007bff;
$hover-text-color: #ffffff;
li {
  &:hover {
    background-color: $hover-bg-color;
    color: $hover-text-color;
  }
}

// Estilos para centrar el reproductor en la pantalla
.reproductor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh; /* Ajusta la altura para centrarlo en la página */
  text-align: center;
}


</style>
