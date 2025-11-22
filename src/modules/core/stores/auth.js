import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'José Luis Moreno',
      email: 'jlmoreno@andalucialaica.org',
      avatar: 'https://ui-avatars.com/api/?name=J+M&background=6366f1&color=fff',
      role: 'Administrador'
    },
    isLoggedIn: true
  }),
  
  actions: {
    logout() {
      this.isLoggedIn = false
      this.user = null
    }
  }
})