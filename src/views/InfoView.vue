<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import InfoArtist from "@/components/ArtistCard.vue";
import InfoAlbum from "@/components/AlbumCard.vue";
import InfoSong from "@/components/SongCard.vue";

const ruta = useRoute();
const enrutador = useRouter();
const id = ruta.params.id; // ID del elemento seleccionado
const tipo = ruta.params.type; // Tipo de elemento seleccionado

const datos = ref(null);
const cargando = ref(true);
const error = ref("");

// Función para obtener la información desde la API de Deezer
const obtenerInfo = async () => {
  if (!id || !tipo) {
    error.value = "No se encontró información.";
    cargando.value = false;
    return;
  }

  try {
    console.log(`🔍 Obteniendo información de ${tipo} con ID: ${id}`);

    let url = `https://api.deezer.com/${tipo}/${id}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    // Verificar si la respuesta es válida
    if (resultado.error) {
      throw new Error("No se encontró información en Deezer.");
    }

    datos.value = resultado;
    console.log("📥 Información obtenida:", datos.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
};

// 🔄 Ejecutar la búsqueda cuando cambie la URL
watchEffect(() => {
  obtenerInfo();
});
</script>

<template>
  <div class="container mt-4">
    <!-- Botón para volver atrás -->
    <button class="btn btn-outline-primary mb-3" @click="enrutador.back()">⬅ Volver</button>

    <!-- Cargando -->
    <div v-if="cargando" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-danger text-center">{{ error }}</p>

    <!-- Mostrar el componente adecuado según el tipo de elemento -->
    <InfoSong v-if="tipo === 'track' && datos" :datos="datos" />
    <InfoAlbum v-if="tipo === 'album' && datos" :datos="datos" />
    <InfoArtist v-if="tipo === 'artist' && datos" :datos="datos" />
  </div>
</template>
