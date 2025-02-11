<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Radios Más Populares</h2>
      <div class="row gx-3 gy-4 justify-content-center">
        <div v-for="radio in topRadios" :key="radio.id" class="col-md-4">
          <div class="card">
            <img :src="radio.picture_big" class="card-img-top" :alt="radio.title">
            <div class="card-body text-center">
              <h5 class="card-title">{{ radio.title }}</h5>
              <a :href="radio.tracklist" target="_blank" class="btn btn-primary">
                Escuchar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const topRadios = ref([]);
  
  const fetchRadios = async () => {
    try {
      const response = await fetch('http://localhost:8080/https://api.deezer.com/radio');
      const data = await response.json();
      topRadios.value = data.data.slice(0, 6); // Tomar 6 radios populares (2 filas de 3)
    } catch (error) {
      console.error("Error al obtener las radios:", error);
    }
  };
  
  onMounted(fetchRadios);
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    transform: translateY(0);
  }
  
  .card:hover {
    transform: scale(1.05) translateY(-5px);
  }
  
  .card img {
    height: 200px;
    object-fit: cover;
  }
  
  .row {
    justify-content: center;
  }
  </style>
  