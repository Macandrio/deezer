<script setup>
import { ref, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";

// Router para redireccionar si estamos en HomeView
const enrutador = useRouter();
const rutaActual = useRoute();

// Variable reactiva para almacenar la búsqueda del usuario
const consultaBusqueda = ref("");

// Emitimos un evento al componente padre cuando el usuario busca algo
const emitir = defineEmits(["search"]);

// Función que se ejecuta al buscar
const realizarBusqueda = () => {
  if (!consultaBusqueda.value.trim()) {
    console.log("⚠️ No se ingresó ninguna búsqueda.");
    return;
  }

  console.log(`🔍 Buscando: "${consultaBusqueda.value}"`);

  // Redirigir a SearchView con el término de búsqueda en la URL
  enrutador.push({ name: "SearchView", query: { q: consultaBusqueda.value } });
};
</script>

<template>
  <div class="contenedor-busqueda d-flex justify-content-end">
    <form class="input-group caja-busqueda" @submit.prevent="realizarBusqueda">
      
      <!-- Campo de entrada donde el usuario escribe su búsqueda -->
      <input
        type="text"
        class="form-control form-control-sm rounded-pill"
        v-model="consultaBusqueda"
        placeholder="🔍 Buscar..."
        aria-label="Buscar"
      />
      <!-- Botón de búsqueda -->
      <button class="btn btn-primary btn-sm rounded-pill" type="submit">
        <i class="bi bi-search"></i>
      </button>
    </form>
  </div>
</template>
