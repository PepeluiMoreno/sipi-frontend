// src/modules/usuarios/composables/useRoles.js

import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_ROLES,
  OBTENER_ROL,
  CREAR_ROL,
  ACTUALIZAR_ROL,
  ELIMINAR_ROL
} from '../graphql/rolQueries'

// ✅ Mocks para desarrollo
import { mockRoles, simulateNetworkDelay } from '../mocks/usuariosMocks'

export function useRoles() {
  const roles = ref([])
  const rol = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0 })
  const backendError = ref(false)

  // ✅ Intentar inicializar mutaciones
  let crearRolMutation, actualizarRolMutation, eliminarRolMutation

  try {
    crearRolMutation = useMutation(CREAR_ROL).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para crearRol')
  }

  try {
    actualizarRolMutation = useMutation(ACTUALIZAR_ROL).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para actualizarRol')
  }

  try {
    eliminarRolMutation = useMutation(ELIMINAR_ROL).mutate
  } catch (e) {
    backendError.value = true
    console.warn('⚠️ Apollo Client no disponible para eliminarRol')
  }

  /**
   * Lista todos los roles
   */
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para listar roles')
      try {
        await simulateNetworkDelay()
        roles.value = mockRoles
        pagination.value.total = mockRoles.length
        return { items: roles.value, total: pagination.value.total }
      } catch (err) {
        error.value = `Error al cargar roles: ${err.message}`
        throw err
      } finally {
        loading.value = false
      }
    }
    
    try {
      const { data, error: queryError } = await useQuery(LISTAR_ROLES, {
        pagination: {
          page: pagination.value.page,
          pageSize: pagination.value.pageSize
        }
      })
      if (queryError) throw queryError
      const response = data.value?.roles
      roles.value = response?.items || []
      pagination.value.total = response?.total || 0
      return { items: roles.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar roles: ${err.message}`
      console.error('Error en listar Roles:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene un rol por ID
   */
  const obtener = async (id) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para obtener rol')
      await simulateNetworkDelay()
      
      const found = mockRoles.find(r => r.id === id)
      if (!found) {
        error.value = 'Rol no encontrado'
        throw new Error('Rol no encontrado')
      }
      
      rol.value = found
      return found
    }
    
    try {
      const { data, error: queryError } = await useQuery(OBTENER_ROL, { id })
      if (queryError) throw queryError
      rol.value = data.value?.rol?.item || null
      return rol.value
    } catch (err) {
      error.value = `Error al obtener rol: ${err.message}`
      console.error('Error en obtener Rol:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Crea un nuevo rol
   */
  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para crear rol')
      await simulateNetworkDelay()
      
      const nuevo = {
        ...inputData,
        id: Date.now().toString(),
        usuarios_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      roles.value.unshift(nuevo)
      pagination.value.total++
      return nuevo
    }
    
    try {
      const { data, errors } = await crearRolMutation({ input: inputData })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearRol.item
      roles.value.unshift(nuevo)
      pagination.value.total++
      return nuevo
    } catch (err) {
      error.value = `Error al crear rol: ${err.message}`
      console.error('Error en crear Rol:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualiza un rol existente
   */
  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para actualizar rol')
      await simulateNetworkDelay()
      
      const index = roles.value.findIndex(r => r.id === id)
      if (index === -1) {
        error.value = 'Rol no encontrado'
        throw new Error('Rol no encontrado')
      }
      
      const actualizado = {
        ...roles.value[index],
        ...inputData,
        id,
        updated_at: new Date().toISOString()
      }
      
      roles.value[index] = actualizado
      return actualizado
    }
    
    try {
      const { data, errors } = await actualizarRolMutation({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarRol.item
      const index = roles.value.findIndex(r => r.id === id)
      if (index !== -1) roles.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = `Error al actualizar rol: ${err.message}`
      console.error('Error en actualizar Rol:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Elimina un rol
   */
  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    
    if (backendError.value || import.meta.env.DEV) {
      console.log('🔄 Usando mocks para eliminar rol')
      await simulateNetworkDelay()
      
      roles.value = roles.value.filter(r => r.id !== id)
      pagination.value.total--
      return true
    }
    
    try {
      const { data, errors } = await eliminarRolMutation({ id })
      if (errors) throw new Error(errors[0].message)
      roles.value = roles.value.filter(r => r.id !== id)
      pagination.value.total--
      return data.eliminarRol.success
    } catch (err) {
      error.value = `Error al eliminar rol: ${err.message}`
      console.error('Error en eliminar Rol:', err)
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
    roles.value = []
    rol.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    roles,
    rol,
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