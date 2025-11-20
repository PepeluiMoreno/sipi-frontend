import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'José Luis Moreno Gómez',
      email: 'jlmoreno@example.com',
      avatar: 'https://ui-avatars.com/api/?name=J+G&background=6366f1&color=fff',
      role: 'Administrador'
    },
    isLoggedIn: true
  }),
  
  actions: {
    logout() {
      this.isLoggedIn = false
      this.user = null
      // Redireccionar a login si existiera
      // router.push('/login')
    }
  }
})