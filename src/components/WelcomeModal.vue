<template>
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Bienvenido 🎵</h2>
        <p>Ingresa tu nombre, elige un avatar y crea una contraseña.</p>
  
        <!-- Input para el nombre -->
        <input v-model="nombre" type="text" class="form-control" placeholder="Escribe tu nombre..." />
  
        <!-- Input para la contraseña -->
        <input v-model="contraseña" type="password" class="form-control mt-2" placeholder="Crea una contraseña" />
  
        <!-- Selección de avatar -->
        <div class="avatar-selection">
          <img 
            v-for="(avatar, index) in avatars" 
            :key="index" 
            :src="avatar" 
            :class="{ selected: avatarSeleccionado === avatar }"
            @click="avatarSeleccionado = avatar"
            alt="Avatar"
          />
        </div>
  
        <!-- Botón para guardar usuario -->
        <button @click="registrarUsuario" class="btn btn-primary">Registrarse</button>
        <button @click="cerrarModal" class="btn btn-secondary mt-2">Cancelar</button>
      </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const mostrarModal = ref(false);
const nombre = ref('');
const contraseña = ref('');
const avatarSeleccionado = ref('');
const emit = defineEmits(["usuarioRegistrado"]);

const avatars = ref([
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5"
]);

const abrirModal = () => {
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const registrarUsuario = () => {
  if (nombre.value.trim() && contraseña.value.trim() && avatarSeleccionado.value) {
    const usuario = {
      nombre: nombre.value.trim(),
      contraseña: contraseña.value.trim(),
      avatar: avatarSeleccionado.value
    };

    // Guardar en localStorage correctamente
    try {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log("Usuario guardado en localStorage:", usuario);
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
    }

    // Emitir evento para actualizar el estado global
    emit("usuarioRegistrado", usuario);

    // Cerrar modal después de registrar
    cerrarModal();
  } else {
    alert("Por favor, completa todos los campos antes de registrarte.");
  }
};

defineExpose({ abrirModal });
</script>

<style scoped>
/* Modal de bienvenida */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Contenedor de avatares */
.avatar-selection {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  gap: 10px;
}

.avatar-selection img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid transparent;
}

.avatar-selection img:hover {
  transform: scale(1.1);
}

.selected {
  border: 2px solid #007bff;
}

button {
  margin-top: 10px;
}
</style>
