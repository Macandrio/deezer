<template>
  <!-- Modal solo se muestra si hay datos en selectedItem -->
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
    <div class="modal-backdrop fade show"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Información Detallada</h5>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body">
          <!-- Renderiza el componente correcto según el tipo -->
          <InfoArtist v-if="selectedType === 'artist'" :artist="selectedItem" />
          <InfoAlbum v-if="selectedType === 'album'" :album="selectedItem" />
          <InfoSong v-if="selectedType === 'song'" :song="selectedItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useInfoStore } from "@/stores/infoStore";
import InfoArtist from "@/components/ArtistCard.vue";
import InfoAlbum from "@/components/AlbumCard.vue";
import InfoSong from "@/components/SongCard.vue";

const infoStore = useInfoStore();
const showModal = ref(false); // Control de visibilidad del modal

// Computed para hacer selectedItem reactivo
const selectedItem = computed(() => infoStore.selectedItem);
const selectedType = computed(() => infoStore.selectedType);

// ⏳ Observa cambios en `selectedItem` y abre el modal automáticamente
watch(selectedItem, (newValue) => {
  console.log("🔍 Cambio detectado en selectedItem:", newValue);
  showModal.value = !!newValue; // Si tiene datos, abre el modal
});

function cerrarModal() {
  showModal.value = false;
  infoStore.selectedType = null;
  infoStore.selectedItem = null;
}
</script>

<style scoped>
/* Agrega el fondo oscuro para que el modal se vea correctamente */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
