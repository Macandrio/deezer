<script setup>
import { defineProps } from "vue";

defineProps({
  album: Object, // Datos del álbum
});
</script>

<template>
  <div class="card h-100 shadow-lg">
    <img :src="album.cover_big" class="card-img-top" :alt="album.title" />
    <div class="card-body text-center">
      <h5 class="card-title text-truncate">{{ album.title }}</h5>
      <p class="card-text text-muted">{{ album.artist.name }}</p>
    </div>
  </div>
</template>
