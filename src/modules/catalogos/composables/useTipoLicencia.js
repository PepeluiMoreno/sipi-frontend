import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_TIPOS_LICENCIA,
  OBTENER_TIPO_LICENCIA,
  CREAR_TIPO_LICENCIA,
  ACTUALIZAR_TIPO_LICENCIA,
  ELIMINAR_TIPO_LICENCIA
} from '../graphql/tipoLicenciaQueries'

export function useTipoLicencia() {
  const tiposLicencia = ref([])
  const tipoLicencia = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0, totalPages: 0 })

  // Listar con filtros avanzados
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_TIPOS_LICENCIA, {
        filters: {
          esLibre: filters.esLibre,
          esOpenSource: filters.esOpenSource,
          esCopyleft: filters.esCopyleft,
          familia: filters.familia,
          obsoleta: filters.obsoleta,
          recomendada: filters.recomendada,
          search: filters.search,
          orderBy: filters.orderBy || ['popularidad_DESC', 'nombre_ASC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 50
        }
      })

      if (queryError) throw queryError

      const response = data.value?.tiposLicencia
      tiposLicencia.value = response?.items || []
      pagination.value.total = response?.total || 0

      return { items: tiposLicencia.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar tipos de licencia: ${err.message}`
      console.error('Error en listar TipoLicencia:', err)
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
      const { data, error: queryError } = await useQuery(OBTENER_TIPO_LICENCIA, { id })

      if (queryError) throw queryError

      tipoLicencia.value = data.value?.tipoLicencia?.item || null
      return tipoLicencia.value
    } catch (err) {
      error.value = `Error al obtener tipo de licencia: ${err.message}`
      console.error('Error en obtener TipoLicencia:', err)
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
      const { mutate } = useMutation(CREAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nuevo = data.tipoLicencia.item
      tiposLicencia.value.unshift(nuevo)
      pagination.value.total++

      return nuevo
    } catch (err) {
      error.value = `Error al crear tipo de licencia: ${err.message}`
      console.error('Error en crear TipoLicencia:', err)
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
      const { mutate } = useMutation(ACTUALIZAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const actualizado = data.tipoLicencia.item
      const index = tiposLicencia.value.findIndex(i => i.id === id)

      if (index !== -1) {
        tiposLicencia.value[index] = actualizado
      }

      return actualizado
    } catch (err) {
      error.value = `Error al actualizar tipo de licencia: ${err.message}`
      console.error('Error en actualizar TipoLicencia:', err)
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
      const { mutate } = useMutation(ELIMINAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      tiposLicencia.value = tiposLicencia.value.filter(i => i.id !== id)
      pagination.value.total--

      return data.tipoLicencia.success
    } catch (err) {
      error.value = `Error al eliminar tipo de licencia: ${err.message}`
      console.error('Error en eliminar TipoLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helpers
  const validarCompatibilidad = (item) => {
    if (item.permite_uso_comercial && item.es_copyleft && !item.requiere_compartir_igual) {
      return { valido: false, mensaje: 'Copyleft debe requerir compartir-igual' }
    }
    return { valido: true }
  }

  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  return {
    tiposLicencia,
    tipoLicencia,
    loading,
    error,
    pagination,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    validarCompatibilidad,
    cambiarPagina
  }
}