// src/modules/usuarios/composables/useUsuarios.js

import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_USUARIOS,
  OBTENER_USUARIO,
  CREAR_USUARIO,
  ACTUALIZAR_USUARIO,
  ELIMINAR_USUARIO
} from '../graphql/usuarioQueries'

// ✅ Mocks para desarrollo
import { mockUsers, simulateNetworkDelay } from '../mocks/usuariosMocks'

export function useUsuarios() {
  const usuarios = ref([])
  const usuario = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0 })
  const backendError = ref(false)

  // ✅ Intentar inicializar mutaciones
  let crearUsuarioMutation, actualizarUsuarioMutation, eliminarUsuarioMutation

  try {
    crearUsuarioMutation = useMutation(CREAR_USUARIO).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para crearUsuario')
  }

  try {
    actualizarUsuarioMutation = useMutation(ACTUALIZAR_USUARIO).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para actualizarUsuario')
  }

  try {
    eliminarUsuarioMutation = useMutation(ELIMINAR_USUARIO).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para eliminarUsuario')
  }

  /**
   * Lista todos los usuarios
   */
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para listar usuarios')
      try {
        await simulateNetworkDelay()
        usuarios.value = mockUsers
        pagination.value.total = mockUsers.length
        return { items: usuarios.value, total: pagination.value.total }
      } catch (err) {
        error.value = `Error al cargar usuarios: ${err.message}`
        throw err
      } finally {
        loading.value = false
      }
    }
    
    try {
      const { data, error: queryError } = await useQuery(LISTAR_USUARIOS, {
        pagination: {
          page: pagination.value.page,
          pageSize: pagination.value.pageSize
        }
      })
      if (queryError) throw queryError
      const response = data.value?.usuarios
      usuarios.value = response?.items || []
      pagination.value.total = response?.total || 0
      return { items: usuarios.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar usuarios: ${err.message}`
      console.error('Error en listar Usuarios:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene un usuario por ID
   */
  const obtener = async (id) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para obtener usuario')
      await simulateNetworkDelay()
      
      const found = mockUsers.find(u => u.id === id)
      if (!found) {
        error.value = 'Usuario no encontrado'
        throw new Error('Usuario no encontrado')
      }
      
      usuario.value = found
      return found
    }
    
    try {
      const { data, error: queryError } = await useQuery(OBTENER_USUARIO, { id })
      if (queryError) throw queryError
      usuario.value = data.value?.usuario?.item || null
      return usuario.value
    } catch (err) {
      error.value = `Error al obtener usuario: ${err.message}`
      console.error('Error en obtener Usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Crea un nuevo usuario
   */
  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para crear usuario')
      await simulateNetworkDelay()
      
      const nuevo = {
        ...inputData,
        id: Date.now().toString(),
        email_verificado: false,
        roles: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      usuarios.value.unshift(nuevo)
      pagination.value.total++
      return nuevo
    }
    
    try {
      const { data, errors } = await crearUsuarioMutation({ input: inputData })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearUsuario.item
      usuarios.value.unshift(nuevo)
      pagination.value.total++
      return nuevo
    } catch (err) {
      error.value = `Error al crear usuario: ${err.message}`
      console.error('Error en crear Usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualiza un usuario existente
   */
  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para actualizar usuario')
      await simulateNetworkDelay()
      
      const index = usuarios.value.findIndex(u => u.id === id)
      if (index === -1) {
        error.value = 'Usuario no encontrado'
        throw new Error('Usuario no encontrado')
      }
      
      const actualizado = {
        ...usuarios.value[index],
        ...inputData,
        id,
        updated_at: new Date().toISOString()
      }
      
      usuarios.value[index] = actualizado
      return actualizado
    }
    
    try {
      const { data, errors } = await actualizarUsuarioMutation({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarUsuario.item
      const index = usuarios.value.findIndex(u => u.id === id)
      if (index !== -1) usuarios.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = `Error al actualizar usuario: ${err.message}`
      console.error('Error en actualizar Usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Elimina un usuario
   */
  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para eliminar usuario')
      await simulateNetworkDelay()
      
      usuarios.value = usuarios.value.filter(u => u.id !== id)
      pagination.value.total--
      return true
    }
    
    try {
      const { data, errors } = await eliminarUsuarioMutation({ id })
      if (errors) throw new Error(errors[0].message)
      usuarios.value = usuarios.value.filter(u => u.id !== id)
      pagination.value.total--
      return data.eliminarUsuario.success
    } catch (err) {
      error.value = `Error al eliminar usuario: ${err.message}`
      console.error('Error en eliminar Usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Cambia de página en la paginación
   */
  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  /**
   * Resetea el estado del composable
   */
  const reset = () => {
    usuarios.value = []
    usuario.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    usuarios,
    usuario,
    loading,
    error,
    backendError,
    pagination,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    cambiarPagina,
    reset
  }
}