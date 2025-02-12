import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    playlist: [],  // Lista de canciones favoritas
    enreproducion: null,  // 🔥 Canción en reproducción
  }),

  getters: {
    // Verifica si una canción está en favoritos
    isFavorite: (state) => (id) => {
      return state.playlist.some((cancion) => cancion.id === id);
    },
  },

  actions: {
    // 🔥 Agregar una canción a la lista sin errores
    Agregarcancion(cancion) {
      console.log("🎵 Intentando añadir canción:", cancion);
      if (!this.isFavorite(cancion.id)) {
        this.playlist.push(cancion);
        console.log("✅ Canción añadida:", cancion);

        // Si no hay canción en reproducción, establecerla
        if (!this.enreproducion) {
          this.setCurrentTrack(cancion);
        }
      }
    },

    // 🔥 Eliminar canción y actualizar si estaba en reproducción
    Eliminarcancion(cancionId) {
      console.log("🗑️ Intentando eliminar canción con ID:", cancionId);
      this.playlist = this.playlist.filter((cancion) => cancion.id !== cancionId);
      console.log("🎵 Playlist actualizada:", this.playlist);

      // Si la canción eliminada estaba en reproducción, actualizar `enreproducion`
      if (this.enreproducion?.id === cancionId) {
        this.enreproducion = this.playlist.length > 0 ? { ...this.playlist[0] } : null;
      }
    },

    // 🔥 Vaciar la lista de reproducción
    Borrarlista() {
      this.playlist = [];
      this.enreproducion = null;
      console.log("🚮 Playlist eliminada.");
    },

    reproducirCancionDesdeLista(cancion) {
      console.log("🎶 Intentando reproducir canción:", cancion);
    
      if (!cancion) {
        console.warn("⚠️ No se puede reproducir una canción vacía.");
        return;
      }
    
      const cancionSeleccionada = this.playlist.find((c) => c.id === cancion.id);
    
      if (cancionSeleccionada) {
        this.enreproducion = { ...cancionSeleccionada }; // 🔥 Reactividad en Vue
        console.log("✅ Canción en reproducción actualizada:", this.enreproducion);
      } else {
        console.warn("⚠️ La canción no está en la playlist.");
      }
    },
    

    // 🔥 Asegurar que el estado se actualiza correctamente
    setCurrentTrack(track) {
      if (!track) return;
      console.log("🔊 Cambiando canción a:", track);
      this.enreproducion = { ...track }; // ✅ Forzar reactividad en Vue
    },

    // 🔥 Reproducir la siguiente canción en la lista
    playNext() {
      console.log('entrado')
      if (this.playlist.length > 0) {
        const currentIndex = this.playlist.findIndex((s) => s.id === this.enreproducion?.id);
        const nextIndex = (currentIndex + 1) % this.playlist.length;
        this.enreproducion = this.playlist[nextIndex];
      }
    },

  }

});
