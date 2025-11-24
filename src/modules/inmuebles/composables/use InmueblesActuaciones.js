// modules/inmuebles/composables/useInmuebleActuaciones.js
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_ACTUACIONES,
  OBTENER_ACTUACION,
  CREAR_ACTUACION,
  ACTUALIZAR_ACTUACION,
  ELIMINAR_ACTUACION
} from '../graphql/inmuebleActuacionQueries'

export function useInmuebleActuaciones(inmuebleId) {
  const actuaciones = ref([])
  const actuacion = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_ACTUACIONES, {
        inmuebleId,
        filters: {
          tipo: filters.tipo,
          estado: filters.estado,
          fechaDesde: filters.fechaDesde,
          fechaHasta: filters.fechaHasta
        },
        orderBy: ['fechaInicio_DESC']
      })
      if (queryError) throw queryError
      actuaciones.value = data.value?.inmuebleActuaciones?.items || []
      return actuaciones.value
    } catch (err) {
      error.value = `Error al cargar actuaciones: ${err.message}`
      console.error('Error en listar Actuaciones:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_ACTUACION, { id })
      actuacion.value = data.value?.inmuebleActuacion?.item || null
      return actuacion.value
    } catch (err) {
      error.value = `Error al obtener actuación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_ACTUACION)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nueva = data.crearInmuebleActuacion.item
      actuaciones.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = `Error al crear actuación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_ACTUACION)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizada = data.actualizarInmuebleActuacion.item
      const index = actuaciones.value.findIndex(i => i.id === id)
      if (index !== -1) actuaciones.value[index] = actualizada
      return actualizada
    } catch (err) {
      error.value = `Error al actualizar actuación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_ACTUACION)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      actuaciones.value = actuaciones.value.filter(i => i.id !== id)
      return data.eliminarInmuebleActuacion.success
    } catch (err) {
      error.value = `Error al eliminar actuación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed
  const actuacionesActivas = computed(() => {
    return actuaciones.value.filter(a => 
      a.estado === 'En curso' || a.estado === 'Planificada'
    )
  })

  const actuacionesCompletadas = computed(() => {
    return actuaciones.value.filter(a => a.estado === 'Completada')
  })

  const proximasActuaciones = computed(() => {
    const hoy = new Date()
    return actuaciones.value
      .filter(a => a.fechaInicio && new Date(a.fechaInicio) > hoy)
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
      .slice(0, 5)
  })

  return {
    actuaciones,
    actuacion,
    loading,
    error,
    actuacionesActivas,
    actuacionesCompletadas,
    proximasActuaciones,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  }
}