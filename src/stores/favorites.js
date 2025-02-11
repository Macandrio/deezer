import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    playlist: [],  // Lista de canciones favoritas
    currentTrack: null,  // 🔥 Canción en reproducción

  }),

  getters: {
    //  Verifica si una canción está en favoritos
    isFavorite: (state) => (id) => {
      return state.playlist.some((cancion) => cancion.id === id);
    },
  },

  actions: {


    Agregarcancion(cancion) {
      console.log("Intentando añadir canción:", cancion);
      if (!this.isFavorite(cancion.id)) {
        this.playlist.push(cancion);
        console.log("Canción añadida:", cancion);
        if (!this.currentTrack) {
          this.setCurrentTrack(song); // 🔥 Si no hay canción reproduciéndose, pon la primera
        }
      }
    },

    Eliminarcancion(cancionId) {
      console.log("Intentando eliminar canción con ID:", cancionId);
      this.playlist = this.playlist.filter((cancion) => cancion.id !== cancionId);
      console.log("Playlist actualizada después de eliminar:", this.playlist);
    },

    Borrarlista(){
      this.playlist = [];
    },

    // ordenarPorArtista() {
    //   this.playlist.sort((a, b) => a.artist.localeCompare(b.artist));
    //   console.log("Playlist ordenada por artista:", this.playlist);
    // },
  
    // ordenarPorCancion() {
    //   this.playlist.sort((a, b) => a.title.localeCompare(b.title));
    //   console.log("Playlist ordenada por canción:", this.playlist);
    // },
   
    // ordenarAlfabeticamente() {
    //   this.playlist.sort((a, b) => {
    //     const nameA = `${a.artist} ${a.title}`;
    //     const nameB = `${b.artist} ${b.title}`;
    //     return nameA.localeCompare(nameB);
    //   });
    //   console.log("Playlist ordenada alfabéticamente:", this.playlist);
    // },

    
    // 🔥 Asegurar que el estado se actualiza correctamente
    setCurrentTrack(track) {
      if (!track) return;
      console.log("🔊 Cambiando canción a:", track);
      this.currentTrack = { ...track }; // ✅ Forzar reactividad en Vue
    },

    // 🔥 Reproducir la siguiente canción en la lista
    playNext() {
      if (this.playlist.length > 0) {
        const currentIndex = this.playlist.findIndex((s) => s.id === this.currentTrack?.id);
        const nextIndex = (currentIndex + 1) % this.playlist.length;
        this.currentTrack = this.playlist[nextIndex];
      }
    },

  },
});