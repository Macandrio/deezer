<script setup>
import { useInfoStore } from "@/stores/infoStore";

const infoStore = useInfoStore();

const props = defineProps({  // ✅ Asegurar que props está correctamente definido
  artista: Object,
});

function verDetalles() {
  if (!props.artista) {  // ✅ Usar props.artista en lugar de artista directamente
    console.error("❌ Error: El artista no está definido.");
    return;
  }
  console.log("🖱️ Click en artista. Enviando a setInfo():", props.artista);
  infoStore.setInfo("artist", props.artista);
}
</script>

<template>
  <div class="card" @click="verDetalles">
    <img :src="artista.picture_medium" class="card-img-top" alt="Imagen del artista" />
    <div class="card-body">
      <h5 class="card-title">{{ artista.name }}</h5>
      <p class="card-text">Seguidores: {{ artista.nb_fan }}</p>
    </div>
  </div>
</template>
