<script setup>
defineProps({
  song: Object,
});
</script>

<template>
  <div class="text-center">
    <img :src="song.album.cover_big" :alt="song.title" class="mb-3 rounded" width="200" />
    <h2>{{ song.title }}</h2>
    <p><strong>Artista:</strong> {{ song.artist.name }}</p>
    <p><strong>Duración:</strong> {{ Math.floor(song.duration / 60) }}:{{ (song.duration % 60).toString().padStart(2, '0') }} min</p>

    <audio v-if="song.preview" controls class="mt-3">
      <source :src="song.preview" type="audio/mpeg" />
      Tu navegador no soporta audio.
    </audio>

    <a :href="song.link" target="_blank" class="btn btn-primary mt-3">Ver en Deezer</a>
  </div>
</template>
