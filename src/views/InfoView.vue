<script setup>
import { useInfoStore } from "@/stores/infoStore";
import InfoArtist from "@/components/InfoArtist.vue";
import InfoAlbum from "@/components/InfoAlbum.vue";
import InfoSong from "@/components/InfoSong.vue";

const infoStore = useInfoStore();

const cerrarModal = () => {
  console.log("❌ Cerrando modal...");
  infoStore.clearInfo();
};
</script>

<template>
  <div v-if="infoStore.selectedType" :key="infoStore.selectedType" class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Información</h5>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body">
          <InfoArtist v-if="infoStore.selectedType === 'artist'" :artist="infoStore.selectedItem" />
          <InfoAlbum v-else-if="infoStore.selectedType === 'album'" :album="infoStore.selectedItem" />
          <InfoSong v-else-if="infoStore.selectedType === 'song'" :song="infoStore.selectedItem" />
        </div>
      </div>
    </div>
  </div>
</template>
