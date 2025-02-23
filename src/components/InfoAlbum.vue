<script setup>
import { useInfoStore } from "@/stores/infoStore";

const infoStore = useInfoStore();

defineProps({
  album: Object,
});

function verDetalles() {
  if (!album) {
    console.error("❌ Error: El álbum no está definido.");
    return;
  }
  console.log("🖱️ Click en álbum. Enviando a setInfo():", album);
  infoStore.setInfo("album", album);
}
</script>

<template>
  <div class="text-center">
    <img :src="album.cover_big" :alt="album.title" class="mb-3 rounded" width="200" />
    <h2>{{ album.title }}</h2>
    <p><strong>Artista:</strong> {{ album.artist.name }}</p>
    <p><strong>Fecha de lanzamiento:</strong> {{ album.release_date }}</p>

    <h3 class="mt-3">Lista de canciones</h3>
    <ul v-if="album.tracks && album.tracks.data">
      <li v-for="track in album.tracks.data" :key="track.id">
        {{ track.title }} - {{ Math.floor(track.duration / 60) }}:{{ (track.duration % 60).toString().padStart(2, '0') }} min
      </li>
    </ul>

    <a :href="album.link" target="_blank" class="btn btn-primary mt-3">Ver en Deezer</a>
  </div>
</template>
