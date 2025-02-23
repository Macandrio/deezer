<script setup>
defineProps({
  artist: Object,
});
</script>

<template>
  <div class="text-center">
    <!-- Imagen del artista con fallback -->
    <img :src="artist?.picture_big || artist?.picture || 'https://via.placeholder.com/200'" 
         :alt="artist?.name" 
         class="rounded-circle mb-3" width="200" />

    <!-- Información del artista -->
    <h2>{{ artist?.name || 'Artista Desconocido' }}</h2>
    <p><strong>Seguidores:</strong> {{ artist?.nb_fan?.toLocaleString() || 'N/A' }}</p>
    <p v-if="artist?.genre"><strong>Género:</strong> {{ artist.genre.name }}</p>

    <!-- Lista de álbumes populares -->
    <h3 class="mt-3">Álbumes Populares</h3>
    <ul v-if="artist?.albums?.data?.length">
      <li v-for="album in artist.albums.data" :key="album.id">
        {{ album.title }} ({{ album.release_date || 'Fecha desconocida' }})
      </li>
    </ul>
    <p v-else class="text-muted">No hay álbumes disponibles.</p>

    <!-- Lista de canciones populares -->
    <h3 class="mt-3">Canciones Populares</h3>
    <ul v-if="artist?.tracks?.data?.length">
      <li v-for="track in artist.tracks.data" :key="track.id">
        {{ track.title }} - {{ Math.floor(track.duration / 60) }}:{{ (track.duration % 60).toString().padStart(2, '0') }} min
      </li>
    </ul>
    <p v-else class="text-muted">No hay canciones disponibles.</p>

    <!-- Enlace a Deezer -->
    <a v-if="artist?.link" :href="artist.link" target="_blank" class="btn btn-primary mt-3">
      Ver en Deezer
    </a>
  </div>
</template>
