<template>
  <div class="card h-100 shadow" v-if="cancion && cancion.album">
    <!-- Imagen de la carátula del álbum -->
      <img
        :src="cancion.album?.cover_big || 'https://via.placeholder.com/150'"
        class="card-img-top"
        :alt="cancion.title"
        @click.stop="verDetalles"
      />

    <!-- Contenido del cuerpo de la tarjeta -->
    <div class="card-body d-flex flex-column">
      <!-- Título de la canción -->
      <h5 class="card-title mb-2 text-truncate text-center">
        {{ cancion.title }}
      </h5>

      <!-- Nombre del artista -->
      <p class="card-text text-muted mb-3 text-center">
        {{ cancion.artist.name }}
      </p>

      <!-- Reproductor de vista previa (si existe) -->
      <audio
        v-if="cancion.preview"
        controls
        class="w-100 mb-3 align-self-center"
      >
        <source :src="cancion.preview" type="audio/mpeg" />
        Tu navegador no soporta audio.
      </audio>

      <!-- Botón "Me gusta" -->
      <button
        class="btn btn-outline-danger mt-auto align-self-center"
        @click="añadircancion"
      >
        <i
          :class="esta ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
          class="me-2"
        ></i>
        <span v-if="esta">Quitar de Favoritos</span>
        <span v-else>Añadir a Favoritos</span>
      </button>
    </div>
  </div>
</template>




<script setup>
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useInfoStore } from "@/stores/infoStore";


const infoStore = useInfoStore();
const props = defineProps({
  cancion: Object,
});

const cancionValida = computed(() => props.cancion && props.cancion.album);

function verDetalles() {
  if (!cancionValida.value) {
    console.error("❌ Error: La canción no está correctamente definida:", props.cancion);
    return;
  }
  console.log("🖱️ Click en la imagen. Canción enviada a setInfo():", props.cancion);
  infoStore.setInfo("song", props.cancion);
}




const favoritesStore = useFavoritesStore();

// Verifica si la canción ya está en la playlist
const esta = computed(() => favoritesStore.isFavorite(props.cancion.id));

function añadircancion(){
    if (esta.value) {
      favoritesStore.Eliminarcancion(props.cancion.id);
    } else {
      favoritesStore.Agregarcancion(props.cancion);
    }
};
</script>

