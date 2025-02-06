<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Buscar Canciones</h2>

    <!-- Barra de búsqueda -->
    <div class="input-group mb-3">
      <input 
        v-model="query" 
        class="form-control" 
        placeholder="Busca una canción..." 
        @keyup.enter="buscarCancion" 
      />
      <button class="btn btn-primary" @click="buscarCancion">Buscar</button>
    </div>

    <!-- Lista de canciones en tarjetas -->
    <div class="row">
      <div v-for="track in canciones" :key="track.id" class="col-md-4 mb-3">
        <div class="card h-100">
          <img :src="track.album.cover_medium" class="card-img-top" alt="Portada">
          <div class="card-body">
            <h5 class="card-title">{{ track.title }}</h5>
            <p class="card-text"><strong>Artista:</strong> {{ track.artist.name }}</p>
            <button class="btn btn-success w-100" @click="seleccionarCancion(track)">🎵 Reproducir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/player.js";

export default {
  data() {
    return {
      query: "",
      canciones: [],
    };
  },
  methods: {
    async buscarCancion() {
      if (!this.query) return;
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.query}`
        );
        const data = await response.json();
        this.canciones = data.data;
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    },
    seleccionarCancion(track) {
      const playerStore = usePlayerStore();
      playerStore.setCancion({
        titulo: track.title,
        artista: track.artist.name,
        imagen: track.album.cover_medium,
        preview: track.preview, // URL de la canción
      });
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.card-img-top {
  height: 180px;
  object-fit: cover;
}
</style>
