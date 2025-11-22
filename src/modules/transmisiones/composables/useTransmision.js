import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_TRANSMISIONES,
  OBTENER_TRANSMISION,
  CREAR_TRANSMISION,
  ACTUALIZAR_TRANSMISION,
  ELIMINAR_TRANSMISION
} from '../graphql/transmisionQueries'

export function useTransmision() {
  const transmisiones = ref([])
  const transmision = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const hasTransmisiones = computed(() => transmisiones.value.length > 0)

  // Listar con filtros
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_TRANSMISIONES, {
        filters: {
          inmuebleId: filters.inmuebleId,
          transmitenteId: filters.transmitenteId,
          adquirienteId: filters.adquirienteId,
          notariaId: filters.notariaId,
          registroPropiedadId: filters.registroPropiedadId,
          tipoTransmisionId: filters.tipoTransmisionId,
          fechaDesde: filters.fechaDesde,
          fechaHasta: filters.fechaHasta,
          precioMin: filters.precioMin,
          precioMax: filters.precioMax,
          orderBy: filters.orderBy || ['fechaTransmision_DESC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 20
        }
      })

      if (queryError) throw queryError

      const response = data.value?.transmisiones
      transmisiones.value = response?.items || []
      pagination.value.total = response?.total || 0
      pagination.value.totalPages = response?.totalPages || 0

      return { items: transmisiones.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar transmisiones: ${err.message}`
      console.error('Error en listar Transmisiones:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener transmisión completa con relaciones
  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(OBTENER_TRANSMISION, {
        id,
        conDocumentos: true,
        conAnunciantes: true
      })

      if (queryError) throw queryError

      transmision.value = data.value?.transmision?.item || null
      return transmision.value
    } catch (err) {
      error.value = `Error al obtener transmisión: ${err.message}`
      console.error('Error en obtener Transmision:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Crear transmisión
  const crear = async (inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(CREAR_TRANSMISION)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nueva = data.crearTransmision.item
      transmisiones.value.unshift(nueva)
      pagination.value.total++

      return nueva
    } catch (err) {
      error.value = `Error al crear transmisión: ${err.message}`
      console.error('Error en crear Transmision:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar transmisión
  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ACTUALIZAR_TRANSMISION)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const actualizada = data.actualizarTransmision.item
      const index = transmisiones.value.findIndex(t => t.id === id)

      if (index !== -1) {
        transmisiones.value[index] = actualizada
      }

      return actualizada
    } catch (err) {
      error.value = `Error al actualizar transmisión: ${err.message}`
      console.error('Error en actualizar Transmision:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar transmisión
  const eliminar = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ELIMINAR_TRANSMISION)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      transmisiones.value = transmisiones.value.filter(t => t.id !== id)
      pagination.value.total--

      return data.eliminarTransmision.success
    } catch (err) {
      error.value = `Error al eliminar transmisión: ${err.message}`
      console.error('Error en eliminar Transmision:', err)
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
    transmisiones.value = []
    transmision.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    transmisiones,
    transmision,
    loading,
    error,
    pagination,
    hasTransmisiones,
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