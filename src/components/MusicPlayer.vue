<template>
    <div v-if="currentTrack" class="music-player">
      <div class="player-container">
        <!-- Sección izquierda: Imagen del álbum y detalles de la canción -->
        <div class="track-info">
          <img
            v-if="currentTrack?.album?.cover"
            :src="currentTrack.album.cover"
            alt="Portada"
            class="track-image"
          />
          <div>
            <h6 class="track-title">{{ currentTrack?.title || "Sin canción" }}</h6>
            <small class="track-artist">{{ currentTrack?.artist?.name || "Desconocido" }}</small>
          </div>
        </div>
        
        <!-- Controles de reproducción y barra de progreso bien centrados -->
        <div class="player-controls">
          <div class="controls">
            <button class="control-btn" @click="playPrev">
              <i class="bi bi-skip-start-fill"></i>
            </button>
            <button class="control-btn play-btn" @click="togglePlay">
              <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>
            <button class="control-btn" @click="playNext">
              <i class="bi bi-skip-end-fill"></i>
            </button>
          </div>
          
          <!-- Barra de progreso -->
          <div class="progress-bar-container">
            <span class="time">{{ formatTime(progress) }}</span>
            <input
              type="range"
              class="progress-bar"
              v-model="progress"
              min="0"
              max="100"
              @input="seek"
            />
            <span class="time">{{ formatTime(duration) }}</span>
          </div>
        </div>
      </div>
  
      <!-- Elemento de audio -->
      <audio ref="audio" :src="currentTrack.preview" @loadedmetadata="setDuration" @timeupdate="updateProgress" @ended="playNext"></audio>
    </div>
  </template>
  
  <style scoped>
  .music-player {
    z-index: 1000; /* Asegura que el reproductor esté por encima de todo */
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #222;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .player-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
  }
  
  .track-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto;
    margin-left: 0;
    position: absolute;
    left: 10px; /* Ajusta la imagen al borde de la pantalla */
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto;
    margin-left: 0; /* Asegura que la imagen esté pegada a la izquierda */
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto;
  }
  
  .track-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .track-title {
    margin: 0;
    font-weight: bold;
  }
  
  .track-artist {
    color: white;
    opacity: 0.8;
  }
  
  .player-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin-left: auto;
  }
  
  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .control-btn:hover {
    transform: scale(1.1);
  }
  
  .play-btn {
    font-size: 2rem;
  }
  
  .progress-bar-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 90%; /* Hacer la barra de progreso más larga */
    max-width: 800px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 80%;
    max-width: 600px;
    margin-top: 10px;
  }
  
  .progress-bar {
    flex-grow: 1;
    appearance: none;
    height: 5px;
    border-radius: 5px;
    background: linear-gradient(to right, #6c757d, #0dcaf0);
    cursor: pointer;
  }
  
  .time {
    font-size: 0.9rem;
    color: white;
  }
  </style>
  
  
  
  
  
  
  
  
  
  
  
  
  
  



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
  



