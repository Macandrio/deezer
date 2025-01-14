import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '', // Estado inicial
  }),
  getters: {
    // Ejemplo de un getter para obtener el dominio del email
    emailDomain: (state) => state.email.split('@')[1] || '',
  },
  actions: {
    // Acción para actualizar el email
    setEmail(newEmail) {
      this.email = newEmail;
    },
    // Acción para limpiar el email
    clearEmail() {
      this.email = '';
    },
  },
});
