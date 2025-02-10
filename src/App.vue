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
    <div class="navbar-wrapper">
      <Menu />
    </div>

    <!-- Contenedor para centrar el reproductor -->
      <Reproductor />

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

.navbar-wrapper {
  width: 100%;
  position: sticky;
  top: 0px; /* Espacio para que no se superponga con el título */
  z-index: 1050;
  background-color: #343a40;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: top 0.3s ease-in-out;
}
</style>
