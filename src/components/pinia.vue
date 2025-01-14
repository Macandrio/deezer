<template>
    <div>
      <h1>🍍 Gestión de estados con Pinia</h1>
      <input
        v-model="email"
        type="email"
        placeholder="Introduce tu email"
      />
      <p>Tu email es: {{ email }}</p>
      <p>Dominio: {{ emailDomain }}</p>
      <button @click="clearEmail">Limpiar Email</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUserStore } from '../stores/email';
  
  // Accede a la store
  const userStore = useUserStore();
  
  // Vínculo con el estado y acciones
  const email = computed({
    get: () => userStore.email,
    set: (value) => userStore.setEmail(value),
  });
  const emailDomain = computed(() => userStore.emailDomain);
  const clearEmail = userStore.clearEmail;
  </script>
  