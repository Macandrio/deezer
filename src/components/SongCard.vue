<template>
  <div class="card h-100 shadow-lg">
    <img :src="cancion.album.cover_big" class="card-img-top" :alt="cancion.title" />
    <div class="card-body text-center">
      <h5 class="card-title text-truncate">{{ cancion.title }}</h5>
      <p class="card-text text-muted">{{ cancion.artist.name }}</p>
      <!-- Botón de "me gusta" adaptado del reproductor -->
      <div class="like-container">
      <button class="btn-like" @click="añadircancion">
        <i :class="esta ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
      </button>
    </div>
    </div>
  </div>
</template>



<script setup>
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites";

const props = defineProps({
  cancion: Object
});

const favoritesStore = useFavoritesStore();

// Verifica si la canción ya está en la playlist
const esta = computed(() => favoritesStore.isFavorite(props.cancion.id));

function añadircancion(){
    if (esta.value) {
      favoritesStore.Eliminarcancion(props.cancion.id);
      console.log('borrado' + cancion.id)
    } else {
      favoritesStore.Agregarcancion(props.cancion);
      console.log('añadida'+ cancion.id)
    }
};



</script>


<style scoped>
/* Botón de "Me gusta" */
.like-container {
  display: flex;
  align-items: center;
}

.btn-like {
  background: transparent;
  border: none;
  font-size: 24px;
  color: rgb(174, 17, 17);
  cursor: pointer;
}

.btn-like:hover {
  color: red;
}

@keyframes fillHeart {
  0% {
    color: transparent;
  }
  100% {
    color: red;
  }
}

.bi-heart-fill {
  animation: fillHeart 0.1s ease-in-out forwards;
}
</style>

