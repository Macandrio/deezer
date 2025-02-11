<template>
  <div class="container mt-4">
    <h1 class="text-center mb-3">Playlist</h1>
    <p class="text-center">Aquí puedes gestionar tus canciones favoritas.</p>

    <!-- Cargar el componente PlaylistManager -->
    <PlaylistManager />
  </div>
</template>

<script setup>
import PlaylistManager from '@/components/PlaylistManager.vue';
</script>