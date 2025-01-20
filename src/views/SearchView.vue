<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <!-- Componente hijo -->
    <SearchBar @results="handleResults" />
     <!-- Lista de canciones -->
    <ul v-if="songs.length > 0">
      <li v-for="song in songs" :key="song.id">
        <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }} - {{ song.duration }}
      </li>
    </ul>
    <p v-else>No hay resultados para mostrar</p>
  </div>
</template>
 <script setup>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo
 const songs = ref([]); // Estado para almacenar la lista de canciones
 // Maneja los resultados emitidos por el componente hijo
const handleResults = (data) => {
  songs.value = data; // Actualiza la lista de canciones
};
</script>