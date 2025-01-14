<template>
    <div>
      <h1>Buscador</h1>
      <p>Busca canciones, artistas o álbumes.</p>
      <p>En esta sección ya se ha configurado una llamada a la API pública de Deezer.</p>
      <p>Para que salgan los resultados debes entrar en <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a></p>
    </div>
  <div class="search-page">
    <h1>Resultados del Álbum</h1>
    <div class="album-info">
      <h2>{{ albumData.title }}</h2>
      <img :src="albumData.cover_medium" alt="Portada del álbum" />
      <p><strong>Artista:</strong> {{ albumData.artist?.name }}</p>
      <p><strong>Fecha de lanzamiento:</strong> {{ albumData.release_date }}</p>
    </div>

    <div class="songs">
      <h3>Canciones</h3>
      <div class="song-cards">
        <div
          v-for="song in albumData.tracks?.data"
          :key="song.id"
          class="song-card"
        >
          <p><strong>{{ song.title }}</strong></p>
          <audio :src="song.preview" controls></audio>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const albumData = ref({}); // Guardará los datos del álbum
  
  // Función para obtener datos del álbum desde la API de Deezer
  const fetchAlbumData = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/586206062');
      if (!response.ok) throw new Error('Error al obtener los datos');
      albumData.value = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Llama a la función al montar el componente
  onMounted(fetchAlbumData);
  </script>
  
  <style scoped>
  h1 {
    color: #dc3545;
  }
  .search-page {
  padding: 20px;
}

.album-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
}

.album-info img {
  margin-top: 10px;
  width: 200px;
  border-radius: 10px;
}

.songs {
  margin-top: 20px;
}

.song-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.song-card {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 10px;
  background-color: #e9ecef;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.song-card audio {
  margin-top: 10px;
  width: 100%;
}
  </style>
  