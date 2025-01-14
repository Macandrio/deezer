<template>
    <div>
      <h1>Playlists</h1>
      <p>Gestiona tus playlists aquí.</p>
    </div>
  <!-- Integrar el componente Pinia -->
  <PiniaComponent />
    <!-- Mostrar datos de la store directamente -->
    <div class="store-data">
      <h3>Datos desde la Store:</h3>
      <p>Email actual: {{ userEmail }}</p>
      <p>Dominio del email: {{ emailDomain }}</p>
    </div>
      
  </template>
  
  <script setup>
  // Accede a la store
import { computed } from 'vue';
import { useUserStore } from '../stores/email';
import PiniaComponent from '../components/pinia.vue';
// Vincula datos de la store
const userStore = useUserStore();

const userEmail = computed(() => userStore.email);
const emailDomain = computed(() => userStore.emailDomain);

  </script>
  
  <style scoped>
  h1 {
    color: #28a745;
  }
  </style>