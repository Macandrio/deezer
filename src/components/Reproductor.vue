<template>
  <div class="reproductor" v-if="cancion">
    <!-- Imagen del álbum -->
    <div class="imagen-container">
      <img :src="cancion.imagen" alt="Portada" class="imagen" v-if="cancion.imagen" />
    </div>

    <!-- Información de la canción -->
    <div class="info">
      <h3 class="titulo">{{ cancion.titulo || "Selecciona una canción" }}</h3>
      <p class="artista">{{ cancion.artista }}</p>
    </div>

    <!-- Controles y barra de progreso -->
    <div class="controles-container">
      <div class="controles">
        <button class="btn-icon" @click="toggleShuffle">
          <i :class="shuffle ? 'bi bi-shuffle text-success' : 'bi bi-shuffle'"></i>
        </button>
        <button class="btn-icon" @click="anteriorCancion">
          <i class="bi bi-skip-start-fill"></i>
        </button>
        <button class="btn-play" @click="togglePlay">
          <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
        <button class="btn-icon" @click="siguienteCancion">
          <i class="bi bi-skip-end-fill"></i>
        </button>
        <button class="btn-icon" @click="toggleMute">
          <i :class="isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'"></i>
        </button>
      </div>

      <!-- Barra de progreso debajo de los controles -->
      <div class="barra-container">
        <span class="tiempo">{{ tiempoActual }}</span>
        <input
          type="range"
          class="barra-progreso"
          :value="progreso"
          max="100"
          @input="actualizarProgreso"
        />
        <span class="tiempo">{{ duracionTotal }}</span>
      </div>
    </div>

    <!-- Botón de "me gusta" -->
    <div class="like-container">
      <button class="btn-like" @click="toggleLike">
        <i :class="isLiked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
      </button>
    </div>

    <!-- Audio -->
    <audio ref="audioPlayer" :src="cancion.preview" @timeupdate="actualizarTiempo"></audio>
  </div>
</template>

<script>
import { usePlayerStore } from "@/stores/player.js";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const playerStore = usePlayerStore();
    const { cancionActual } = storeToRefs(playerStore);

    return {
      cancion: cancionActual,
    };
  },
  data() {
    return {
      progreso: 0,
      isPlaying: false,
      isMuted: false,
      shuffle: false,
      isLiked: false, // Estado del botón de me gusta
      tiempoActual: "0:00",
      duracionTotal: "0:00",
    };
  },
  watch: {
    cancion(newCancion) {
      if (newCancion && newCancion.preview) {
        this.$nextTick(() => {
          this.$refs.audioPlayer.play();
          this.isPlaying = true;
        });
      }
    },
  },
  methods: {
    actualizarProgreso(event) {
      const audio = this.$refs.audioPlayer;
      const newTime = (event.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
    },
    actualizarTiempo() {
      const audio = this.$refs.audioPlayer;
      this.progreso = (audio.currentTime / audio.duration) * 100;
      this.tiempoActual = this.formatearTiempo(audio.currentTime);
      this.duracionTotal = this.formatearTiempo(audio.duration);
    },
    formatearTiempo(segundos) {
      if (isNaN(segundos)) return "0:00";
      const min = Math.floor(segundos / 60);
      const sec = Math.floor(segundos % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    },
    togglePlay() {
      const audio = this.$refs.audioPlayer;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    toggleMute() {
      const audio = this.$refs.audioPlayer;
      this.isMuted = !this.isMuted;
      audio.muted = this.isMuted;
    },
    toggleShuffle() {
      this.shuffle = !this.shuffle;
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    siguienteCancion() {
      console.log("Clic en siguienteCancion en Reproductor.vue");
      playerStore.siguienteCancion();
    },

    anteriorCancion() {
      console.log("Clic en anteriorCancion en Reproductor.vue");
      playerStore.anteriorCancion();
    },

  },
};
</script>

<style scoped>
.reproductor {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribuye los elementos */
  padding: 10px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.imagen-container {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.titulo {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.artista {
  font-size: 12px;
  color: #bbb;
}

/* Contenedor de los controles y la barra de progreso */
.controles-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* Controles de reproducción */
.controles {
  display: flex;
  align-items: center;
  justify-content: center; /* Centra los botones */
  gap: 15px;
  width: 100%;
  margin-right: 105px;

}

.btn-icon {
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.btn-icon:hover {
  color: #1db954;
}

/* Botón de Play/Pausa */
.btn-play {
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;

}

.btn-play:hover {
  background: #1db954;
  color: white;
}

/* Barra de progreso centrada */
.barra-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Centra la barra */
  gap: 10px;
  width: 50%;
  margin-right: 80px;
}

.tiempo {
  font-size: 14px;
  color: #bbb;
}

.barra-progreso {
  flex: 1;
  height: 5px;
  cursor: pointer;
  background: #444;
  border-radius: 5px;
}

/* Botón de "Me gusta" */
.like-container {
  display: flex;
  align-items: center;
}

.btn-like {
  background: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.btn-like:hover {
  color: red;
}
</style>

