<template>

    <!-- <div>
        <button @click="ordenarPorArtista">Ordenar por Artista</button>
        <button @click="ordenarPorCancion">Ordenar por Canción</button>
        <button @click="ordenarAlfabeticamente">Ordenar Alfabéticamente</button>
    </div> -->

    <div class="container mt-4">
      <h2>Gestión de Playlist</h2>
      <div class="list-group">
        <PlaylistItem
          v-for="cancion in playlist"
          :key="cancion.id"
          :cancion="cancion"
          @remove="Eliminarcancionlista"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useFavoritesStore } from '@/stores/favorites';
  import { computed } from 'vue';
  import PlaylistItem from '@/components/PlaylistItem.vue';
  
  // Usar la store de favoritos
  const favoritesStore = useFavoritesStore();
  const playlist = computed(() => favoritesStore.playlist);
  console.log(playlist.value)
  
  // Función para eliminar una canción
  const Eliminarcancionlista = (cancion) => {
    favoritesStore.Eliminarcancion(cancion);
  };
  </script>
  
  <style scoped>
  .list-group {
    margin-top: 20px;
  }
  </style>
  