import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_DIOCESIS,
  OBTENER_DIOCESIS,
  CREAR_DIOCESIS,
  ACTUALIZAR_DIOCESIS,
  ELIMINAR_DIOCESIS
} from '../graphql/diocesisQueries'

export function useDiocesis() {
  const diocesis = ref([])
  const diocesisActual = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0 })

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_DIOCESIS, {
        filters: {
          search: filters.search,
          wikidataQid: filters.wikidataQid,
          orderBy: filters.orderBy || ['nombre_ASC']
        },
        pagination: filters.pagination || { page: 1, pageSize: 50 }
      })
      if (queryError) throw queryError
      const response = data.value?.diocesis
      diocesis.value = response?.items || []
      pagination.value.total = response?.total || 0
      return { items: diocesis.value, total: pagination.value.total }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    try {
      const { data } = await useQuery(OBTENER_DIOCESIS, { id, conTitulares: true })
      diocesisActual.value = data.value?.diocesis?.item || null
      return diocesisActual.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    try {
      const { mutate } = useMutation(CREAR_DIOCESIS)
      const { data, errors } = await mutate({ input: inputData })
      if (errors) throw new Error(errors[0].message)
      const nueva = data.crearDiocesis.item
      diocesis.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    try {
      const { mutate } = useMutation(ACTUALIZAR_DIOCESIS)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarDiocesis.item
      const index = diocesis.value.findIndex(i => i.id === id)
      if (index !== -1) diocesis.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    try {
      const { mutate } = useMutation(ELIMINAR_DIOCESIS)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      diocesis.value = diocesis.value.filter(i => i.id !== id)
      return data.eliminarDiocesis.success
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    diocesis,
    diocesis: diocesisActual,
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