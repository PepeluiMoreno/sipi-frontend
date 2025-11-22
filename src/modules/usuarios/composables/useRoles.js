import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_ROLES,
  OBTENER_ROL,
  CREAR_ROL,
  ACTUALIZAR_ROL,
  ELIMINAR_ROL
} from '../graphql/rolQueries'

export function useRoles() {
  const roles = ref([])
  const rol = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const hasRoles = computed(() => roles.value.length > 0)

  // Listar roles
  const { refetch: refetchRoles } = useQuery(LISTAR_ROLES, {
    filters: {},
    pagination: { page: 1, pageSize: 50 }
  }, {
    fetchPolicy: 'cache-and-network'
  })

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await refetchRoles({
        filters,
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 20
        }
      })

      const response = data?.roles
      roles.value = response?.items || []
      pagination.value = {
        page: response?.page || 1,
        pageSize: response?.pageSize || 20,
        total: response?.total || 0,
        totalPages: response?.totalPages || 0
      }

      return { items: roles.value, pagination: pagination.value }
    } catch (err) {
      error.value = `Error al cargar roles: ${err.message}`
      console.error('Error en listar roles:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener rol por ID
  const { refetch: refetchRol } = useQuery(OBTENER_ROL, { id: '' })

  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await refetchRol({ id })
      rol.value = data?.rol?.item || null
      return rol.value
    } catch (err) {
      error.value = `Error al obtener rol: ${err.message}`
      console.error('Error en obtener rol:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mutations
  const { mutate: crearMutation } = useMutation(CREAR_ROL)
  const { mutate: actualizarMutation } = useMutation(ACTUALIZAR_ROL)
  const { mutate: eliminarMutation } = useMutation(ELIMINAR_ROL)

  const crear = async (inputData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await crearMutation({ input: inputData })
      
      if (data?.crearRol?.success) {
        const nuevoRol = data.crearRol.item
        roles.value.unshift(nuevoRol)
        pagination.value.total++
        return nuevoRol
      } else {
        throw new Error(data?.crearRol?.message || 'Error al crear rol')
      }
    } catch (err) {
      error.value = `Error al crear rol: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await actualizarMutation({ id, input: inputData })
      
      if (data?.actualizarRol?.success) {
        const rolActualizado = data.actualizarRol.item
        
        // Actualizar en la lista
        const index = roles.value.findIndex(r => r.id === id)
        if (index !== -1) {
          roles.value[index] = { ...roles.value[index], ...rolActualizado }
        }
        
        // Actualizar rol actual si es el mismo
        if (rol.value?.id === id) {
          rol.value = { ...rol.value, ...rolActualizado }
        }
        
        return rolActualizado
      } else {
        throw new Error(data?.actualizarRol?.message || 'Error al actualizar rol')
      }
    } catch (err) {
      error.value = `Error al actualizar rol: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await eliminarMutation({ id })
      
      if (data?.eliminarRol?.success) {
        roles.value = roles.value.filter(r => r.id !== id)
        pagination.value.total--
        
        if (rol.value?.id === id) {
          rol.value = null
        }
        
        return true
      } else {
        throw new Error(data?.eliminarRol?.message || 'Error al eliminar rol')
      }
    } catch (err) {
      error.value = `Error al eliminar rol: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    roles.value = []
    rol.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    // State
    roles,
    rol,
    loading,
    error,
    pagination,
    
    // Computed
    hasRoles,
    
    // Methods
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    reset
  }
}