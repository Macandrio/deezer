import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    cancionActual: null,
    listaCanciones: [],
  }),

  actions: {
    setCancion(cancion, lista = []) {
      this.cancionActual = { ...cancion }; // 🔹 Forzar reactividad
      if (lista.length) {
        this.listaCanciones = [...lista]; // 🔹 Guardar toda la lista de canciones
      }
    },

    siguienteCancion() {
      if (!this.listaCanciones.length) return;

      const indexActual = this.listaCanciones.findIndex(
        (c) => c.preview === this.cancionActual?.preview
      );

      let nuevoIndex = (indexActual + 1) % this.listaCanciones.length; // 🔹 Volver al inicio si es la última
      this.cancionActual = { ...this.listaCanciones[nuevoIndex] }; // 🔹 Forzar reactividad
    },

    anteriorCancion() {
      if (!this.listaCanciones.length) return;

      const indexActual = this.listaCanciones.findIndex(
        (c) => c.preview === this.cancionActual?.preview
      );

      let nuevoIndex = indexActual - 1;
      if (nuevoIndex < 0) {
        nuevoIndex = this.listaCanciones.length - 1; // 🔹 Si es la primera, vuelve a la última
      }

      this.cancionActual = { ...this.listaCanciones[nuevoIndex] }; // 🔹 Forzar reactividad
    },
  },
});
