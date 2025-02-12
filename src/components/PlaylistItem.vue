<template>
  <div class="card mb-3 playlist-item">
    <div class="row g-0 align-items-center">
      <div class="col-md-4">
        <img 
          :src="cancion.album.cover" 
          class="img-fluid rounded-start" 
          alt="Album cover"
          @click="$emit('reproducir', cancion)"
        />


      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">{{ cancion.title }}</h5>
          <p class="card-text"><small class="text-muted">{{ cancion.artist.name }}</small></p>
        </div>
      </div>
      <div class="col-md-2">
        <button @click="$emit('eliminar', cancion.id)" class="btn btn-danger">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    cancion: Object
});

</script>


<style scoped>
.playlist-item {
  background-color: #f8f9fa; /* Light grey background */
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>