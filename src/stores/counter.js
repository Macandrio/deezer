import { defineStore } from 'pinia';
import { preview } from 'vite';

export const useUserStore = defineStore('counter', {
  state: () => ({
    playlist: [], // Estado inicial
  }),
  getters: {
    getTotal: (state) => playlist.length
  },


  actions: {
    addSong(song) {
      var newSong = {
        id:this.playlist.length + 1,
        name: song.name,
        artist: song.artist,
        preview: song.preview
        
      }
      this.playlist.push(newsong)
    },



    // Acción para limpiar el song
    clearsong() {
      this.song = '';
    },

    //
  },
});