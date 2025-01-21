<template>
  <div class="container">
    <h1>Home</h1>
    <p>Bienvenido a la aplicación Deezer Music Client.</p>
    <p>
      Este proyecto sirve de base para la aplicación a desarrollar como tarea
      del curso.
    </p>
    <p>
      Para facilitar el desarrollo, este proyecto ya viene configurado con
      Bootstrap, Bootstrap Icons, SASS, router y Pinia.
    </p>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h1>Bootstrap Icons</h1>
      <p>Bootstrap Icons es una biblioteca de iconos creada por el equipo de Bootstrap...</p>
      <p class="text-bg-light p-3 border">
        <!-- Iconos aquí -->
      </p>
    </div>
    <div class="col-md-6 sass-example">
      <h1>SASS</h1>
      <p>SASS (Syntactically Awesome Stylesheets)...</p>
      <p class="psass">
        SASS es un preprocesador CSS que agrega características como:
        <ul>
          <li>Anidación de estilos</li>
          <li>Variables</li>
          <li>Mixins</li>
          <li>Herencia</li>
        </ul>
        Todo esto mejora la mantenibilidad del código CSS.
      </p>
    </div>
  </div>


  <!-- Carrusel -->
  <div id="carouselExample" class="carousel slide mt-4" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://cdn-images.dzcdn.net/images/cover/13904b570b4c0972fd9db8ee0524cac2/1900x1900-000000-80-0-0.jpg" class="d-block w-100" alt="Primera imagen">
      </div>
      <div class="carousel-item">
        <img src="https://www.cantautorelbarrio.com/img/discos/el-danzar-de-las-mariposas.jpg" class="d-block w-100" alt="Segunda imagen">
      </div>
      <div class="carousel-item">
        <img src="https://cdn-images.dzcdn.net/images/cover/0752f64be0e65b1ea5c55695b0a7406a/0x1900-000000-80-0-0.jpg" class="d-block w-100" alt="Tercera imagen">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
  const chart = ref([]);

// Función para realizar la búsqueda
const searchDeezer = async () => {
    if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías
    const url = `https://api.deezer.com/chart`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al buscar en Deezer");
      }
      const data = await response.json();
      chart = data;
    } catch (error) {
      console.error(error.message);
    }
  };

  onMounted("searchDeezer");
</script>
<style scoped>
.carousel-item img {
  height: 400px;
  object-fit: cover;
}
</style>
