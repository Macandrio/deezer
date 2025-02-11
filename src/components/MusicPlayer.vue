<template>
    <div v-if="currentTrack" class="music-player">
        <!-- Controles de la izquierda -->
        <div class="player-controls">
            <button class="btn btn-dark" @click="playPrev">
                <i class="bi bi-skip-backward-fill"></i>
            </button>
            <button class="btn btn-dark play-btn" @click="togglePlay">
                <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
            </button>
            <button class="btn btn-dark" @click="playNext">
                <i class="bi bi-skip-forward-fill"></i>
            </button>
        </div>

        <!-- Imagen de la canción en el centro -->
        <div class="track-info">
            <img :src="currentTrack.album.cover_small" alt="Cover" class="track-cover" />
            <div class="track-details">
                <h4>{{ currentTrack.title }}</h4>
                <p>{{ currentTrack.artist.name }}</p>
            </div>
        </div>

        <!-- Botón de pantalla completa a la derecha -->
        <div class="expand-btn">
            <button class="btn btn-dark" @click="toggleFullScreen">
                <i class="bi bi-arrows-fullscreen"></i>
            </button>
        </div>

        <!-- Barra de progreso con tiempos -->
        <div class="progress-container">
            <span class="time">{{ formatTime(progress) }}</span>
            <input
                type="range"
                min="0"
                :max="audio?.duration || 1"
                step="0.1"
                v-model="progress"
                @input="seek"
            />
            <span class="time">{{ formatTime(audio?.duration || 0) }}</span>
        </div>

        <!-- Audio (oculto) -->
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
const currentTrack = computed(() => store.currentTrack);

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
};

const playPrev = () => {
    const currentIndex = store.playlist.findIndex((s) => s.id === currentTrack.value?.id);
    if (currentIndex > 0) {
        store.setCurrentTrack(store.playlist[currentIndex - 1]);
        isPlaying.value = false;
        setTimeout(() => audio.value?.play(), 100);
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
    () => store.currentTrack,
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

<style scoped>
/* 🔹 Reproductor de Música */
.music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: #181818;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

/* 🔹 Controles de reproducción */
.player-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* 🔹 Imagen de la canción en el centro */
.track-info {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 300px;
}

.track-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.track-details h4 {
    font-size: 14px;
    margin: 0;
}

.track-details p {
    font-size: 12px;
    margin: 0;
    color: #bbb;
}

/* 🔹 Botón de pantalla completa */
.expand-btn {
    display: flex;
    align-items: center;
}

/* 🔹 Barra de progreso */
.progress-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(0, 0, 0, 0.2);
}

.progress-container input {
    width: 100%;
    height: 7px;
    cursor: pointer;
    background: transparent;
    appearance: none;
}

.progress-container input::-webkit-slider-runnable-track {
    background: red;
    height: 5px;
}

.progress-container input::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    margin-top: -2px;
}

.time {
    font-size: 12px;
    color: white;
    min-width: 40px;
    text-align: center;
}
</style>