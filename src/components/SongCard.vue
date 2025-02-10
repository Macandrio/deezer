<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  cancion: Object, // Datos de la canción
});

const emitir = defineEmits(["agregarAPlaylist"]);

// Función para emitir el evento de agregar a la playlist
const agregarAPlaylist = () => {
  emitir("agregarAPlaylist", props.cancion);
};
</script>

<template>
  <div class="card h-100 shadow-lg">
    <img :src="cancion.album.cover_big" class="card-img-top" :alt="cancion.title" />
    <div class="card-body text-center">
      <h5 class="card-title text-truncate">{{ cancion.title }}</h5>
      <p class="card-text text-muted">{{ cancion.artist.name }}</p>
      <button class="btn btn-success btn-sm mt-2" @click="agregarAPlaylist">➕ Agregar a Playlist</button>
    </div>
  </div>
</template>
