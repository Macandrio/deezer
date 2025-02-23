<script setup>
import { useInfoStore } from "@/stores/infoStore";

const infoStore = useInfoStore();

const props = defineProps({  // ✅ Asegurar que props está correctamente definido
  album: Object,
});

function verDetalles() {
  if (!props.album) {  // ✅ Usar props.album en lugar de album directamente
    console.error("❌ Error: El álbum no está definido.");
    return;
  }
  console.log("🖱️ Click en álbum. Enviando a setInfo():", props.album);
  infoStore.setInfo("album", props.album);
}
</script>

<template>
  <div class="card h-100 shadow-lg" @click="verDetalles">
    <img :src="album.cover_big" class="card-img-top" :alt="album.title" />
    <div class="card-body text-center">
      <h5 class="card-title text-truncate">{{ album.title }}</h5>
      <p class="card-text text-muted">{{ album.artist.name }}</p>
    </div>
  </div>
</template>
