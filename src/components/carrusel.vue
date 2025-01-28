<template>
  <div id="carouselExampleIndicators" class="carousel slide d-block w-50 mx-auto" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div v-for="(cancion, index) in canciones" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <div class="carousel-caption d-none d-md-block">
              <h5>Cancion: {{ cancion.title}}</h5>
              <p>Album: {{ cancion.album.title }}</p>
          </div>
        <img :src="cancion.album.cover_big" class="d-block w-100"/>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canciones = ref([]);

const searchDeezer = async () => {
    const llamada = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart');
    const datos = await llamada.json();
    canciones.value = datos.tracks.data;
};
onMounted(searchDeezer);
</script>