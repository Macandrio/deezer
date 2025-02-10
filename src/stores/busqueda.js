import { defineStore } from "pinia";

export const cancionBusqueda = defineStore("busqueda", {
  state: () => ({
    consulta: "", // Almacena la búsqueda del usuario
    resultados: [], // Lista de canciones encontradas
  }),

  actions: {
    async buscarCanciones() {
      if (!this.consulta) return; // Si la consulta está vacía, no hacer nada

      try {
        // Hacemos la petición a Deezer usando fetch
        const respuesta = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${this.consulta}`
        );
        const datos = await respuesta.json(); // Convertimos la respuesta a JSON
        this.resultados = datos.data; // Guardamos los resultados en el estado
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    },
  },
});
