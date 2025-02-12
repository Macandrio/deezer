<template>
    <div v-if="currentTrack" class="fixed-bottom bg-dark text-white py-2 px-3 w-100">
      <div class="container-fluid d-flex align-items-center justify-content-between">
        
        <!-- Sección izquierda: Imagen del álbum y detalles de la canción -->
        <div class="d-flex align-items-center w-20 flex-shrink-0 me-3">
          <img
            v-if="currentTrack?.album?.cover"
            :src="currentTrack.album.cover"
            alt="Portada"
            class="img-fluid rounded me-2"
            style="width: 50px; height: 50px;"
          />
          <div>
            <h6 class="m-0">{{ currentTrack?.title || "Sin canción" }}</h6>
            <small class="text-muted d-block">{{ currentTrack?.artist?.name || "Desconocido" }}</small>
          </div>
        </div>
  
        <!-- Controles de reproducción centrados -->
        <div class="d-flex flex-column align-items-center w-50">
          <div class="d-flex align-items-center justify-content-center mb-1">
            <button class="btn btn-link text-white fs-4 me-3" @click="playPrev">
              <i class="bi bi-skip-start-fill"></i>
            </button>
            <button class="btn btn-link text-white mx-3 fs-3" @click="togglePlay">
              <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>
            <button class="btn btn-link text-white fs-4 ms-3" @click="playNext">
              <i class="bi bi-skip-end-fill"></i>
            </button>
          </div>
  
          <!-- Barra de progreso alineada con tiempos -->
          <div class="d-flex align-items-center w-100">
            <span class="text-muted small me-2">{{ formatTime(progress) }}</span>
            <input
              type="range"
              class="form-range mx-2 w-75"
              v-model="progress"
              min="0"
              max="100"
              @input="seek"
              style="height: 6px;"
            />
            <span class="text-muted small ms-2">{{ formatTime(duration) }}</span>
          </div>
        </div>
  
        <!-- Sección derecha: Botón de "Me gusta" -->
        <button class="btn btn-link text-white">
          <i class="bi bi-heart"></i>
        </button>
      </div>
  
      <!-- Elemento de audio -->
      <audio ref="audio" :src="currentTrack.preview" @loadedmetadata="setDuration" @timeupdate="updateProgress" @ended="playNext"></audio>
    </div>
  </template>
  



  <script setup>
   import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
    import { useFavoritesStore } from "@/stores/favorites.js";

    const store = useFavoritesStore();
    const audio = ref(null);
    const isPlaying = ref(false);
    const progress = ref(0);
    const duration = ref(0);

    // ✅ `currentTrack` es reactivo
    const currentTrack = computed(() => store.enreproducion);

    const togglePlay = () => {
    if (!audio.value) return;
    if (isPlaying.value) {
        audio.value.pause();
    } else {
        audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

const playNext = () => {
    store.playNext();
    isPlaying.value = false;
    setTimeout(() => audio.value?.play(), 100);
    console.log('sigueinte')
};

const playPrev = () => {
    const currentIndex = store.playlist.findIndex((s) => s.id === currentTrack.value?.id);
    if (currentIndex > 0) {
        store.setCurrentTrack(store.playlist[currentIndex - 1]);
        isPlaying.value = false;
        setTimeout(() => audio.value?.play(), 100);
        console.log('atras')
    }
};

// ✅ Asegurar que la duración se actualiza correctamente
const setDuration = () => {
    if (audio.value) {
        duration.value = audio.value.duration;
    }
};

// ✅ Actualizar la barra de progreso
const updateProgress = () => {
    if (audio.value) {
        progress.value = audio.value.currentTime;
    }
};

// ✅ Buscar en la pista de audio
const seek = () => {
    if (audio.value) {
        audio.value.currentTime = progress.value;
    }
};

// ✅ Detectar cambios en `currentTrack`
watch(
    () => store.enreproducion,
    async (newTrack) => {
        if (newTrack && audio.value) {
            await nextTick(); // Esperar a que la referencia del audio se actualice
            audio.value.load();
            audio.value.play();
            isPlaying.value = true;
            progress.value = 0;
        }
    }
);

onMounted(() => {
    if (currentTrack.value && audio.value) {
        audio.value.play();
    }
});

onUnmounted(() => {
    if (audio.value) {
        audio.value.pause();
    }
});

// ✅ Formatear tiempo en minutos:segundos
const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
};


  </script>
  