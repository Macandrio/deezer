<template>
  <div class="search-container">
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="searchDeezer"
        placeholder="Buscar en Deezer"
      />
      <button @click="searchDeezer">
        <i class="bi bi-search"></i> <!-- Ícono de búsqueda de Bootstrap -->
      </button>
    </div>
  </div>
</template>


 <script setup>
  import { ref } from "vue";
  const searchQuery = ref(""); // Estado reactivo para la barra de búsqueda

  // Función para realizar la búsqueda
  const searchDeezer = async () => {
    if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(
      searchQuery.value
    )}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al buscar en Deezer");
      }
      const data = await response.json();
      emit("results", data.data); // Emitimos los resultados al componente padre
    } catch (error) {
      console.error(error.message);
    }
  };

  // Define la función para emitir eventos
  const emit = defineEmits(["results"]);


  //funcion para ordenar la lista y filtrar por 
</script>






<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
 .search-input {
  width: 90%;
  max-width: 600px; /* Opcional: limitar el ancho máximo */
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  padding: 0;
}
 .search-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px 0 0 5px;
}
 .search-input button {
  border: none;
  background-color: transparent;
  padding: 0 10px;
  cursor: pointer;
  color: #777;
  font-size: 20px;
}
 .search-input button:hover {
  color: #000;
}
</style>