<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import SongCard from "@/components/SongCard.vue";
import AlbumCard from "@/components/AlbumCard.vue";
import ArtistCard from "@/components/ArtistCard.vue";

// 📌 Definimos `props` para recibir datos desde `SearchView.vue`
const props = defineProps({
  canciones: {
    type: Array,
    default: () => [],
  },
  albumes: {
    type: Array,
    default: () => [],
  },
  artistas: {
    type: Array,
    default: () => [],
  },
});

// 📌 Emitimos un evento cuando se hace clic en una canción para reproducirla
const emit = defineEmits(["reproducir"]);

function emitirCancion(cancion) {
  emit('reproducir', cancion);
}

const filtro = ref("todos"); // Estado del filtro seleccionado

// 📌 Computed para filtrar los resultados correctamente
const resultadosFiltrados = computed(() => {
  return {
    canciones: filtro.value === "canciones" || filtro.value === "todos" ? props.canciones : [],
    albumes: filtro.value === "albumes" || filtro.value === "todos" ? props.albumes : [],
    artistas: filtro.value === "artistas" || filtro.value === "todos" ? props.artistas : [],
  };
});

</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Resultados de la búsqueda</h1>

    <!-- Filtros dinámicos -->
    <div class="mb-3 text-center">
      <button class="btn btn-outline-primary me-2" @click="filtro = 'todos'">Todos</button>
      <button class="btn btn-outline-success me-2" @click="filtro = 'canciones'">🎵 Canciones</button>
      <button class="btn btn-outline-danger me-2" @click="filtro = 'albumes'">💿 Álbumes</button>
      <button class="btn btn-outline-warning" @click="filtro = 'artistas'">🎤 Artistas</button>
    </div>

    <!-- Canciones -->
    <div v-if="resultadosFiltrados.canciones.length">
      <h2 class="text-primary">🎵 Canciones</h2>
      <div class="row">
        <div v-for="cancion in resultadosFiltrados.canciones" :key="cancion.id" class="col-md-4 col-lg-3 mb-4">
          <div @click="emitirCancion(cancion)">
            <SongCard :cancion="cancion" />
          </div>
        </div>
      </div>
    </div>

    <!-- Álbumes -->
    <div v-if="resultadosFiltrados.albumes.length">
      <h2 class="text-danger mt-4">💿 Álbumes</h2>
      <div class="row">
        <div v-for="album in resultadosFiltrados.albumes" :key="album.id" class="col-md-4 col-lg-3 mb-4">
          <AlbumCard :album="album" />
        </div>
      </div>
    </div>

    <!-- Artistas -->
    <div v-if="resultadosFiltrados.artistas.length">
      <h2 class="text-warning mt-4">🎤 Artistas</h2>
      <div class="row">
        <div v-for="artista in resultadosFiltrados.artistas" :key="artista.id" class="col-md-4 col-lg-3 mb-4">
          <ArtistCard :artista="artista" />
        </div>
      </div>
    </div>

    <!-- Si no hay resultados -->
    <p v-if="!resultadosFiltrados.canciones.length && !resultadosFiltrados.albumes.length && !resultadosFiltrados.artistas.length" class="text-center text-danger fs-4">
      No se encontraron resultados.
    </p>
  </div>
</template>
