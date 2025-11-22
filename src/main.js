// src/main.js

import './style.css'     // LUEGO tus estilos personalizados

import { createApp } from 'vue'
import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

// IMPORTAR EL COMPONENTE PRINCIPAL
import App from './App.vue'
import router from './modules/core/router'
// Importar Pinia
import { createPinia } from 'pinia'

// Crear instancia de Pinia
const pinia = createPinia()

// Configurar Apollo Client y Vue Apollo        

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Tu endpoint GraphQL
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  }
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

// Crear la aplicación
const app = createApp(App)

// Usar plugins
app.use(router)
app.use(pinia)
app.use(apolloProvider)

// Montar la aplicación
app.mount('#app')

console.log('🚀 Desarrollo: Mock data cargado')
console.log('📍 Router cargado:', router)
console.log('📍 Apollo Client cargado:', apolloClient)