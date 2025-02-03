<template>
    <div class="reproductor">
      <!-- Imagen del álbum a la izquierda -->
      <img :src="track?.album.cover_big" alt="Carátula del álbum" class="cover" />
  
      <!-- Contenedor derecho con título y controles -->
      <div class="info">
        <div class="text">
          <h2>{{ track?.title }}</h2>
          <p>{{ track?.artist.name }}</p>
  
          <!-- Controles de reproducción -->
          <div class="controls">
            <button @click="togglePlay" class="play-btn">
              <span v-if="!isPlaying">▶️</span>
              <span v-else>⏸️</span>
            </button>
  
            <!-- Barra de progreso -->
            <input type="range" min="0" :max="duration" step="0.1" v-model="currentTime" @input="seekAudio" class="progress-bar" />
          </div>
        </div>
      </div>
  
      <audio ref="audioPlayer" :src="track?.preview" @timeupdate="updateProgress" @ended="isPlaying = false"></audio>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        track: null,
        isPlaying: false,
        volume: 0.5,
        currentTime: 0,
        duration: 30
      };
    },
    methods: {
      async fetchTrack() {
        try {
          const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556');
          const data = await response.json();
          this.track = data;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      },
      togglePlay() {
        const audio = this.$refs.audioPlayer;
        if (!this.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
        this.isPlaying = !this.isPlaying;
      },
      updateProgress() {
        this.currentTime = this.$refs.audioPlayer.currentTime;
      },
      seekAudio() {
        this.$refs.audioPlayer.currentTime = this.currentTime;
      }
    },
    mounted() {
      this.fetchTrack();
    }
  };
  </script>
  
  <style scoped>
  /* Contenedor principal del reproductor */
  .reproductor {
    background: #1e1e1e;
    color: white;
    padding: 15px;
    border-radius: 15px;
    max-width: 500px;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  }
  
  /* Imagen del álbum a la izquierda */
  .cover {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  /* Contenedor del texto y controles a la derecha */
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }
  
  /* Estilos del título y artista */
  .text h2 {
    margin: 0;
    font-size: 1.2em;
  }
  
  .text p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #bbb;
  }
  
  /* Controles de reproducción */
  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  /* Botón de reproducción */
  .play-btn {
    background: #1db954;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
  }
  
  .play-btn:hover {
    background: #17a246;
  }
  
  /* Barra de progreso */
  .progress-bar {
    flex-grow: 1;
    width: 150px;
    height: 5px;
    background: #555;
    border-radius: 5px;
    cursor: pointer;
    accent-color: #1db954;
  }
  </style>
  