<script setup>
import { ref, watchEffect, nextTick } from "vue";
import { useRoute } from "vue-router";
import SearchResults from "@/components/SearchResults.vue";

const ruta = useRoute();
const consulta = ref(""); // Captura la búsqueda actual desde la URL
const canciones = ref([]);
const albumes = ref([]);
const artistas = ref([]);
const cargando = ref(false);
const error = ref("");

// Proxy para evitar bloqueos de CORS
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Alternativa: "https://api.allorigins.win/raw?url="

// Función para buscar en la API de Deezer
const buscar = async (query) => {
  if (!query.trim()) {
    error.value = "No se ingresó ninguna búsqueda.";
    return;
  }
  consulta.value = query; // Actualiza la búsqueda
  cargando.value = true;
  error.value = "";

  try {
    console.log(`🔍 Buscando en Deezer con: "${query}"`);

    // Esperar a que Vue termine de actualizar el DOM antes de hacer las peticiones
    await nextTick();

    // Hacemos 3 peticiones separadas: Canciones, Álbumes y Artistas con Proxy
    const [resCanciones, resAlbumes, resArtistas] = await Promise.all([
      fetch(`${PROXY_URL}https://api.deezer.com/search/track?q=${query}`).then((res) => res.json()),
      fetch(`${PROXY_URL}https://api.deezer.com/search/album?q=${query}`).then((res) => res.json()),
      fetch(`${PROXY_URL}https://api.deezer.com/search/artist?q=${query}`).then((res) => res.json()),
    ]);

    // Verificamos si los datos existen antes de asignarlos
    canciones.value = resCanciones?.data?.length ? resCanciones.data : [];
    albumes.value = resAlbumes?.data?.length ? resAlbumes.data : [];
    artistas.value = resArtistas?.data?.length ? resArtistas.data : [];

    console.log("📥 Resultados obtenidos:", {
      canciones: canciones.value.length,
      albumes: albumes.value.length,
      artistas: artistas.value.length,
    });

    // Verificamos si la API devolvió resultados vacíos
    if (!resArtistas?.data?.length) {
      console.warn("⚠️ No se encontraron artistas para esta búsqueda.");
    }
  } catch (err) {
    error.value = "Error al obtener los datos de Deezer.";
    console.error("❌ Error en la búsqueda:", err);
  } finally {
    cargando.value = false;
  }
};

// 🔄 Observa cambios en la URL para actualizar la búsqueda
watchEffect(() => {
  consulta.value = ruta.query.q || "";
  if (consulta.value) buscar(consulta.value);
});
</script>

<template>
  <div class="container mt-4">

    <!-- Mostrar mensaje de carga -->
    <div v-if="cargando" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Mostrar mensaje de error -->
    <p v-if="error" class="text-danger text-center">{{ error }}</p>

    <!-- Mostrar los resultados de la búsqueda -->
    <SearchResults v-if="!cargando" :canciones="canciones" :albumes="albumes" :artistas="artistas" />
  </div>
</template>
