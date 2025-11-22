import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'

/**
 * Composable base para agentes con datos de contacto
 * @param {String} agenteNombre - Nombre del agente en GraphQL (ej: 'tecnicos')
 * @param {Object} options - Opciones de configuración
 */
export function useAgenteBase(agenteNombre, options = {}) {
  const {
    pageSize = 50,
    orderBy = 'nombre_ASC',
    conContacto = true,  // Incluye datos de dirección/contacto
    conRelaciones = false // Incluye relaciones complejas
  } = options

  const items = ref([])
  const item = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pageSize,
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
      const queryName = `listar${agenteNombre.charAt(0).toUpperCase() + agenteNombre.slice(1)}`
      const query = require(`../graphql/${agenteNombre}Queries.js`)[queryName]

      const { data, error: queryError } = await useQuery(query, {
        filters: {
          search: filters.search,
          localidadId: filters.localidadId,
          activo: filters.activo ?? true,
          orderBy: filters.orderBy || [orderBy]
        },
        pagination: {
          page: pagination.value.page,
          pageSize: pagination.value.pageSize
        }
      })

      if (queryError) throw queryError

      const response = data.value?.[agenteNombre]
      items.value = response?.items || []
      pagination.value.total = response?.total || 0
      pagination.value.totalPages = response?.totalPages || 0

      return { items: items.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar ${agenteNombre}: ${err.message}`
      console.error(`Error en listar ${agenteNombre}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener por ID (con datos completos)
  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const queryName = `obtener${agenteNombre.charAt(0).toUpperCase() + agenteNombre.slice(1)}`
      const query = require(`../graphql/${agenteNombre}Queries.js`)[queryName]

      const { data, error: queryError } = await useQuery(query, { id })

      if (queryError) throw queryError

      item.value = data.value?.[agenteNombre]?.item || null
      return item.value
    } catch (err) {
      error.value = `Error al obtener ${agenteNombre}: ${err.message}`
      console.error(`Error en obtener ${agenteNombre}:`, err)
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
      const mutationName = `crear${agenteNombre.charAt(0).toUpperCase() + agenteNombre.slice(1)}`
      const mutation = require(`../graphql/${agenteNombre}Queries.js`)[mutationName]

      const { mutate } = useMutation(mutation)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nuevoItem = data[Object.keys(data)[0]].item
      items.value.unshift(nuevoItem)
      pagination.value.total++

      return nuevoItem
    } catch (err) {
      error.value = `Error al crear ${agenteNombre}: ${err.message}`
      console.error(`Error en crear ${agenteNombre}:`, err)
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
      const mutationName = `actualizar${agenteNombre.charAt(0).toUpperCase() + agenteNombre.slice(1)}`
      const mutation = require(`../graphql/${agenteNombre}Queries.js`)[mutationName]

      const { mutate } = useMutation(mutation)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const itemActualizado = data[Object.keys(data)[0]].item
      const index = items.value.findIndex(i => i.id === id)

      if (index !== -1) {
        items.value[index] = itemActualizado
      }

      return itemActualizado
    } catch (err) {
      error.value = `Error al actualizar ${agenteNombre}: ${err.message}`
      console.error(`Error en actualizar ${agenteNombre}:`, err)
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
      const mutationName = `eliminar${agenteNombre.charAt(0).toUpperCase() + agenteNombre.slice(1)}`
      const mutation = require(`../graphql/${agenteNombre}Queries.js`)[mutationName]

      const { mutate } = useMutation(mutation)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      items.value = items.value.filter(i => i.id !== id)
      pagination.value.total--

      return data[Object.keys(data)[0]].success
    } catch (err) {
      error.value = `Error al eliminar ${agenteNombre}: ${err.message}`
      console.error(`Error en eliminar ${agenteNombre}:`, err)
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