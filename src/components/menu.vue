<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Importamos los modales -->
      <WelcomeModal ref="welcomeModal" @usuarioRegistrado="usuario = $event" />
      <LoginModal ref="loginModal" @usuarioLogueado="usuario = $event" />

      <!-- Buscador en el menú -->
      <SearchBar />

      <!-- Menú de navegación centrado -->
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">🏠 Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/playlists">🎼 Playlists</router-link>
        </li>
      </ul>

      <!-- Usuario logueado -->
      <div v-if="usuario" class="d-flex align-items-center">
        <img :src="usuario.avatar" alt="Avatar" class="avatar" />
        <span class="text-white ms-2">Hola, {{ usuario.nombre }}!</span>
        <button @click="cerrarSesion" class="btn btn-sm btn-danger ms-3">Cerrar Sesión</button>
      </div>

      <!-- Botones de Login y Registro -->
      <div v-if="!usuario" class="d-flex">
        <button @click="abrirRegistro" class="btn btn-success me-2">Registrarse</button>
        <button @click="abrirLogin" class="btn btn-primary">Login</button>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import WelcomeModal from './WelcomeModal.vue';
import LoginModal from './LoginModal.vue';
import SearchBar from './SearchBar.vue';

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
.navbar {
  padding: 10px 20px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
