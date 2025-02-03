<template>
  <div>
    <!-- Importamos los modales -->
    <WelcomeModal ref="welcomeModal" @usuarioRegistrado="usuario = $event" />
    <LoginModal ref="loginModal" @usuarioLogueado="usuario = $event" />

    <!-- Menú de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-menu">
      <div class="container-fluid">
        
        <!-- Botón hamburguesa en móviles -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <!-- Menú de navegación -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">🏠 Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/playlists">🎼 Playlists</router-link>
            </li>
          </ul>

          <!-- Buscador centrado -->
          <div class="search-container mx-auto">
            <input type="text" class="search-input" placeholder="Buscar..." />
            <router-link class="search-btn" to="/search">🔎</router-link>
          </div>

          <!-- Usuario logueado -->
          <div v-if="usuario" class="d-flex align-items-center">
            <img :src="usuario.avatar" alt="Avatar" class="avatar" />
            <span class="text-white ms-2">Hola, {{ usuario.nombre }}!</span>
            <button @click="cerrarSesion" class="btn btn-sm btn-danger ms-3">Cerrar Sesión</button>
          </div>

          <!-- Botones de Login y Registro cuando el usuario NO está logueado -->
          <div v-if="!usuario" class="d-flex">
            <button @click="abrirRegistro" class="btn btn-success me-2">Registrarse</button>
            <button @click="abrirLogin" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import WelcomeModal from './WelcomeModal.vue';
import LoginModal from './LoginModal.vue';

const usuario = ref(null);
const welcomeModal = ref(null);
const loginModal = ref(null);

onMounted(() => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    const datosUsuario = JSON.parse(usuarioGuardado);
    if (datosUsuario.sesionIniciada !== false) {
      usuario.value = datosUsuario; // 🔹 Solo muestra el usuario si la sesión sigue iniciada
    }
  }
});


const abrirRegistro = () => {
  welcomeModal.value.abrirModal();
};

const abrirLogin = () => {
  loginModal.value.abrirModal();
};

const cerrarSesion = () => {
  let usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  if (usuarioGuardado) {
    usuarioGuardado.sesionIniciada = false; // 🔹 Marcarlo como deslogueado
    localStorage.setItem("usuario", JSON.stringify(usuarioGuardado)); // 🔹 Guardar sin borrar datos
  }
  usuario.value = null;
};

</script>


<style scoped>
/* Menú con margen superior y sticky para fijarse al hacer scroll */
.sticky-menu {
  position: sticky;
  top: 0;
  z-index: 1050;
  width: 100%;
  background-color: #343a40;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

/* Avatar del usuario */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
