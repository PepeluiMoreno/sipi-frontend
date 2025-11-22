import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_INMUEBLES,
  OBTENER_INMUEBLE,
  CREAR_INMUEBLE,
  ACTUALIZAR_INMUEBLE,
  ELIMINAR_INMUEBLE
} from '../graphql/inmuebleQueries'

export function useInmueble() {
  const inmuebles = ref([])
  const inmueble = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const hasInmuebles = computed(() => inmuebles.value.length > 0)
  const isEmpty = computed(() => !loading.value && inmuebles.value.length === 0)

  // Listar con filtros avanzados
  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_INMUEBLES, {
        filters: {
          search: filters.search,
          localidadId: filters.localidadId,
          provinciaId: filters.provinciaId,
          comunidadAutonomaId: filters.comunidadAutonomaId,
          tipoInmuebleId: filters.tipoInmuebleId,
          estadoConservacionId: filters.estadoConservacionId,
          estadoTratamientoId: filters.estadoTratamientoId,
          esBic: filters.esBic,
          esRuina: filters.esRuina,
          estaInmatriculado: filters.estaInmatriculado,
          tieneCoordenadas: filters.tieneCoordenadas,
          diocesisId: filters.diocesisId,
          protegido: filters.protegido,
          orderBy: filters.orderBy || ['updatedAt_DESC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 20
        }
      })

      if (queryError) throw queryError

      const response = data.value?.inmuebles
      inmuebles.value = response?.items || []
      pagination.value.total = response?.total || 0
      pagination.value.totalPages = response?.totalPages || 0

      return { items: inmuebles.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar inmuebles: ${err.message}`
      console.error('Error en listar Inmuebles:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener inmueble completo con todas las relaciones
  const obtener = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(OBTENER_INMUEBLE, {
        id,
        conDenominaciones: true,
        conTransmisiones: true,
        conActuaciones: true,
        conDocumentos: true,
        conFigurasProteccion: true,
        conInmatriculacion: true,
        conOSM: true,
        conWikidata: true
      })

      if (queryError) throw queryError

      inmueble.value = data.value?.inmueble?.item || null
      return inmueble.value
    } catch (err) {
      error.value = `Error al obtener inmueble: ${err.message}`
      console.error('Error en obtener Inmueble:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Crear inmueble
  const crear = async (inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(CREAR_INMUEBLE)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nuevo = data.crearInmueble.item
      inmuebles.value.unshift(nuevo)
      pagination.value.total++

      return nuevo
    } catch (err) {
      error.value = `Error al crear inmueble: ${err.message}`
      console.error('Error en crear Inmueble:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar inmueble
  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ACTUALIZAR_INMUEBLE)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const actualizado = data.actualizarInmueble.item
      const index = inmuebles.value.findIndex(i => i.id === id)

      if (index !== -1) {
        inmuebles.value[index] = actualizado
      }

      return actualizado
    } catch (err) {
      error.value = `Error al actualizar inmueble: ${err.message}`
      console.error('Error en actualizar Inmueble:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar inmueble
  const eliminar = async (id) => {
    loading.value = true
    error.value = null

    try {
      const { mutate } = useMutation(ELIMINAR_INMUEBLE)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      inmuebles.value = inmuebles.value.filter(i => i.id !== id)
      pagination.value.total--

      return data.eliminarInmueble.success
    } catch (err) {
      error.value = `Error al eliminar inmueble: ${err.message}`
      console.error('Error en eliminar Inmueble:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helpers para propiedades calculadas
  const tieneProteccion = (item) => {
    return item?.esBic || (item?.figurasProteccion?.length > 0)
  }

  const nivelProteccion = (item) => {
    if (item?.esBic) return "BIC"
    if (item?.figurasProteccion?.length > 0) return "Protegido"
    return "Sin protección"
  }

  const estaGeocodificado = (item) => {
    return item?.latitud !== null && item?.longitud !== null
  }

  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  const reset = () => {
    inmuebles.value = []
    inmueble.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    inmuebles,
    inmueble,
    loading,
    error,
    pagination,
    hasInmuebles,
    isEmpty,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    tieneProteccion,
    nivelProteccion,
    estaGeocodificado,
    cambiarPagina,
    reset
  }
}