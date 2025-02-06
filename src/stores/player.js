import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    cancionActual: null,
  }),
  actions: {
    setCancion(cancion) {
      this.cancionActual = cancion;
    },
  },
});
