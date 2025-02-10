<script setup>
defineProps({
  artista: Object, // Recibe un objeto artista, no una lista de canciones
});
</script>

<template>
  <div class="card">
    <img :src="artista.picture_medium" class="card-img-top" alt="Imagen del artista" />
    <div class="card-body">
      <h5 class="card-title">{{ artista.name }}</h5>
      <p class="card-text">Seguidores: {{ artista.nb_fan }}</p>
    </div>
  </div>
</template>
