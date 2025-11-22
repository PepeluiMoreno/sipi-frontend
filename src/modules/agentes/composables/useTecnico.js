import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_TECNICOS,
  OBTENER_TECNICO,
  CREAR_TECNICO,
  ACTUALIZAR_TECNICO,
  ELIMINAR_TECNICO
} from '../graphql/tecnicoQueries'

export function useTecnico() {
  const tecnicos = ref([])
  const tecnico = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0 })

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_TECNICOS, {
        filters: {
          search: filters.search,
          rolTecnicoId: filters.rolTecnicoId,
          colegioProfesionalId: filters.colegioProfesionalId,
          localidadId: filters.localidadId,
          orderBy: filters.orderBy || ['nombre_ASC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 50
        }
      })
      if (queryError) throw queryError
      const response = data.value?.tecnicos
      tecnicos.value = response?.items || []
      pagination.value.total = response?.total || 0
      return { items: tecnicos.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar técnicos: ${err.message}`
      console.error('Error en listar Tecnicos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(OBTENER_TECNICO, { id })
      if (queryError) throw queryError
      tecnico.value = data.value?.tecnico?.item || null
      return tecnico.value
    } catch (err) {
      error.value = `Error al obtener técnico: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_TECNICO)
      const { data, errors } = await mutate({ input: inputData })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearTecnico.item
      tecnicos.value.unshift(nuevo)
      pagination.value.total++
      return nuevo
    } catch (err) {
      error.value = `Error al crear técnico: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_TECNICO)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarTecnico.item
      const index = tecnicos.value.findIndex(i => i.id === id)
      if (index !== -1) tecnicos.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = `Error al actualizar técnico: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_TECNICO)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      tecnicos.value = tecnicos.value.filter(i => i.id !== id)
      pagination.value.total--
      return data.eliminarTecnico.success
    } catch (err) {
      error.value = `Error al eliminar técnico: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tecnicos,
    tecnico,
    loading,
    error,
    pagination,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  }
}