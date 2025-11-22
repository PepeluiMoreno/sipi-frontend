import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_FUENTES_DOCUMENTALES,
  OBTENER_FUENTE_DOCUMENTAL,
  CREAR_FUENTE_DOCUMENTAL,
  ACTUALIZAR_FUENTE_DOCUMENTAL,
  ELIMINAR_FUENTE_DOCUMENTAL
} from '../graphql/fuenteDocumentalQueries'

export function useFuenteDocumental() {
  const fuentes = ref([])
  const fuente = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0, totalPages: 0 })

  // Listar con filtros
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_FUENTES_DOCUMENTALES, {
        filters: {
          esExterna: filters.esExterna,
          categoria: filters.categoria,
          soportaSincronizacion: filters.soportaSincronizacion,
          activa: filters.activa ?? true,
          search: filters.search,
          orderBy: filters.orderBy || ['orden_ASC', 'nombre_ASC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 50
        }
      })

      if (queryError) throw queryError

      const response = data.value?.fuentesDocumentales
      fuentes.value = response?.items || []
      pagination.value.total = response?.total || 0

      return { items: fuentes.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar fuentes documentales: ${err.message}`
      console.error('Error en listar FuenteDocumental:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener por ID
  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(OBTENER_FUENTE_DOCUMENTAL, { id })

      if (queryError) throw queryError

      fuente.value = data.value?.fuenteDocumental?.item || null
      return fuente.value
    } catch (err) {
      error.value = `Error al obtener fuente documental: ${err.message}`
      console.error('Error en obtener FuenteDocumental:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Crear
  const crear = async (inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(CREAR_FUENTE_DOCUMENTAL)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nueva = data.fuenteDocumental.item
      fuentes.value.unshift(nueva)
      pagination.value.total++

      return nueva
    } catch (err) {
      error.value = `Error al crear fuente documental: ${err.message}`
      console.error('Error en crear FuenteDocumental:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar
  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ACTUALIZAR_FUENTE_DOCUMENTAL)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const actualizada = data.fuenteDocumental.item
      const index = fuentes.value.findIndex(i => i.id === id)

      if (index !== -1) {
        fuentes.value[index] = actualizada
      }

      return actualizada
    } catch (err) {
      error.value = `Error al actualizar fuente documental: ${err.message}`
      console.error('Error en actualizar FuenteDocumental:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar
  const eliminar = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ELIMINAR_FUENTE_DOCUMENTAL)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      fuentes.value = fuentes.value.filter(i => i.id !== id)
      pagination.value.total--

      return data.fuenteDocumental.success
    } catch (err) {
      error.value = `Error al eliminar fuente documental: ${err.message}`
      console.error('Error en eliminar FuenteDocumental:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helpers
  const validarEndpoint = (url) => {
    if (!url) return { valido: true }
    try {
      new URL(url)
      return { valido: true }
    } catch {
      return { valido: false, mensaje: 'URL inválida para endpoint' }
    }
  }

  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  return {
    fuentes,
    fuente,
    loading,
    error,
    pagination,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    validarEndpoint,
    cambiarPagina
  }
}