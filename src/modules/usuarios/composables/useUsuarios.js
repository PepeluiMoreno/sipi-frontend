import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_USUARIOS,
  OBTENER_USUARIO,
  CREAR_USUARIO,
  ACTUALIZAR_USUARIO,
  ELIMINAR_USUARIO,
  ASIGNAR_ROLES_USUARIO,
  ACTUALIZAR_AVATAR,
  REENVIAR_VERIFICACION_EMAIL
} from '../graphql/usuarioQueries'

export function useUsuarios() {
  const usuarios = ref([])
  const usuario = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const hasUsuarios = computed(() => usuarios.value.length > 0)

  // Listar usuarios
  const { refetch: refetchUsuarios } = useQuery(LISTAR_USUARIOS, {
    filters: {},
    pagination: { page: 1, pageSize: 50 }
  }, {
    fetchPolicy: 'cache-and-network'
  })

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await refetchUsuarios({
        filters,
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 20
        }
      })

      const response = data?.usuarios
      usuarios.value = response?.items || []
      pagination.value = {
        page: response?.page || 1,
        pageSize: response?.pageSize || 20,
        total: response?.total || 0,
        totalPages: response?.totalPages || 0
      }

      return { items: usuarios.value, pagination: pagination.value }
    } catch (err) {
      error.value = `Error al cargar usuarios: ${err.message}`
      console.error('Error en listar usuarios:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener usuario por ID
  const { refetch: refetchUsuario } = useQuery(OBTENER_USUARIO, { id: '' })

  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await refetchUsuario({ id })
      usuario.value = data?.usuario?.item || null
      return usuario.value
    } catch (err) {
      error.value = `Error al obtener usuario: ${err.message}`
      console.error('Error en obtener usuario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mutations
  const { mutate: crearMutation } = useMutation(CREAR_USUARIO)
  const { mutate: actualizarMutation } = useMutation(ACTUALIZAR_USUARIO)
  const { mutate: eliminarMutation } = useMutation(ELIMINAR_USUARIO)
  const { mutate: asignarRolesMutation } = useMutation(ASIGNAR_ROLES_USUARIO)
  const { mutate: actualizarAvatarMutation } = useMutation(ACTUALIZAR_AVATAR)
  const { mutate: reenviarVerificacionMutation } = useMutation(REENVIAR_VERIFICACION_EMAIL)

  const crear = async (inputData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await crearMutation({ input: inputData })
      
      if (data?.crearUsuario?.success) {
        const nuevoUsuario = data.crearUsuario.item
        usuarios.value.unshift(nuevoUsuario)
        pagination.value.total++
        return nuevoUsuario
      } else {
        throw new Error(data?.crearUsuario?.message || 'Error al crear usuario')
      }
    } catch (err) {
      error.value = `Error al crear usuario: ${err.message}`
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
      
      if (data?.actualizarUsuario?.success) {
        const usuarioActualizado = data.actualizarUsuario.item
        
        // Actualizar en la lista
        const index = usuarios.value.findIndex(u => u.id === id)
        if (index !== -1) {
          usuarios.value[index] = { ...usuarios.value[index], ...usuarioActualizado }
        }
        
        // Actualizar usuario actual si es el mismo
        if (usuario.value?.id === id) {
          usuario.value = { ...usuario.value, ...usuarioActualizado }
        }
        
        return usuarioActualizado
      } else {
        throw new Error(data?.actualizarUsuario?.message || 'Error al actualizar usuario')
      }
    } catch (err) {
      error.value = `Error al actualizar usuario: ${err.message}`
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
      
      if (data?.eliminarUsuario?.success) {
        usuarios.value = usuarios.value.filter(u => u.id !== id)
        pagination.value.total--
        
        if (usuario.value?.id === id) {
          usuario.value = null
        }
        
        return true
      } else {
        throw new Error(data?.eliminarUsuario?.message || 'Error al eliminar usuario')
      }
    } catch (err) {
      error.value = `Error al eliminar usuario: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const asignarRoles = async (usuarioId, rolesIds) => {
    try {
      const { data } = await asignarRolesMutation({ usuarioId, rolesIds })
      return data?.asignarRolesUsuario
    } catch (err) {
      error.value = `Error al asignar roles: ${err.message}`
      throw err
    }
  }

  const actualizarAvatar = async (usuarioId, avatar) => {
    try {
      const { data } = await actualizarAvatarMutation({ usuarioId, avatar })
      return data?.actualizarAvatar
    } catch (err) {
      error.value = `Error al actualizar avatar: ${err.message}`
      throw err
    }
  }

  const reenviarVerificacion = async (usuarioId) => {
    try {
      const { data } = await reenviarVerificacionMutation({ usuarioId })
      return data?.reenviarVerificacionEmail
    } catch (err) {
      error.value = `Error al reenviar verificación: ${err.message}`
      throw err
    }
  }

  const reset = () => {
    usuarios.value = []
    usuario.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    // State
    usuarios,
    usuario,
    loading,
    error,
    pagination,
    
    // Computed
    hasUsuarios,
    
    // Methods
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    asignarRoles,
    actualizarAvatar,
    reenviarVerificacion,
    reset
  }
}