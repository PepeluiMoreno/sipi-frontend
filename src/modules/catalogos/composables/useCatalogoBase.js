import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_CATALOGO_SIMPLE,
  OBTENER_CATALOGO_SIMPLE,
  CREAR_CATALOGO_SIMPLE,
  ACTUALIZAR_CATALOGO_SIMPLE,
  ELIMINAR_CATALOGO_SIMPLE
} from '../graphql/catalogoBaseQueries'

/**
 * Composable base para catálogos simples (nombre, descripción)
 * @param {String} catalogoNombre - Nombre del catálogo en GraphQL (ej: 'estadosConservacion')
 */
export function useCatalogoBase(catalogoNombre) {
  const items = ref([])
  const item = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pageSize: 50,
    total: 0,
    totalPages: 0
  })

  const hasItems = computed(() => items.value.length > 0)
  const isEmpty = computed(() => !loading.value && items.value.length === 0)

  // Listar con filtros
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_CATALOGO_SIMPLE, {
        catalogo: catalogoNombre,
        filters: {
          search: filters.search,
          orderBy: filters.orderBy || ['nombre_ASC']
        },
        pagination: {
          page: pagination.value.page,
          pageSize: pagination.value.pageSize
        }
      })

      if (queryError) throw queryError

      const response = data.value?.[catalogoNombre]
      items.value = response?.items || []
      pagination.value.total = response?.total || 0
      pagination.value.totalPages = response?.totalPages || 0

      return { items: items.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar ${catalogoNombre}: ${err.message}`
      console.error(`Error en listar ${catalogoNombre}:`, err)
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
      const { data, error: queryError } = await useQuery(OBTENER_CATALOGO_SIMPLE, {
        catalogo: catalogoNombre,
        id
      })

      if (queryError) throw queryError

      item.value = data.value?.[catalogoNombre]?.item || null
      return item.value
    } catch (err) {
      error.value = `Error al obtener ${catalogoNombre}: ${err.message}`
      console.error(`Error en obtener ${catalogoNombre}:`, err)
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
      const { mutate } = useMutation(CREAR_CATALOGO_SIMPLE)
      const { data, errors } = await mutate({
        catalogo: catalogoNombre,
        input: inputData
      })

      if (errors) throw new Error(errors[0].message)

      const nuevoItem = data[Object.keys(data)[0]].item
      items.value.unshift(nuevoItem)
      pagination.value.total++

      return nuevoItem
    } catch (err) {
      error.value = `Error al crear ${catalogoNombre}: ${err.message}`
      console.error(`Error en crear ${catalogoNombre}:`, err)
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
      const { mutate } = useMutation(ACTUALIZAR_CATALOGO_SIMPLE)
      const { data, errors } = await mutate({
        catalogo: catalogoNombre,
        id,
        input: inputData
      })

      if (errors) throw new Error(errors[0].message)

      const itemActualizado = data[Object.keys(data)[0]].item
      const index = items.value.findIndex(i => i.id === id)

      if (index !== -1) {
        items.value[index] = itemActualizado
      }

      return itemActualizado
    } catch (err) {
      error.value = `Error al actualizar ${catalogoNombre}: ${err.message}`
      console.error(`Error en actualizar ${catalogoNombre}:`, err)
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
      const { mutate } = useMutation(ELIMINAR_CATALOGO_SIMPLE)
      const { data, errors } = await mutate({
        catalogo: catalogoNombre,
        id
      })

      if (errors) throw new Error(errors[0].message)

      items.value = items.value.filter(i => i.id !== id)
      pagination.value.total--

      return data[Object.keys(data)[0]].success
    } catch (err) {
      error.value = `Error al eliminar ${catalogoNombre}: ${err.message}`
      console.error(`Error en eliminar ${catalogoNombre}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helpers
  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  const reset = () => {
    items.value = []
    item.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    items,
    item,
    loading,
    error,
    pagination,
    hasItems,
    isEmpty,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    cambiarPagina,
    reset
  }
}