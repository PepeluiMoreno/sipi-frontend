// modules/inmuebles/composables/useInmuebleEstadisticas.js
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  ESTADISTICAS_INMUEBLES,
  INFORME_CONSERVACION,
  INFORME_PROTECCION
} from '../graphql/inmuebleEstadisticaQueries'

export function useInmuebleEstadisticas() {
  const estadisticas = ref(null)
  const informeConservacion = ref(null)
  const informeProteccion = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const obtenerEstadisticas = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(ESTADISTICAS_INMUEBLES, {
        filters: {
          comunidadAutonomaId: filters.comunidadAutonomaId,
          provinciaId: filters.provinciaId,
          tipoInmuebleId: filters.tipoInmuebleId
        }
      })
      if (queryError) throw queryError
      estadisticas.value = data.value?.estadisticasInmuebles || null
      return estadisticas.value
    } catch (err) {
      error.value = `Error al cargar estadísticas: ${err.message}`
      console.error('Error en obtenerEstadisticas:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const generarInformeConservacion = async (inmuebleId) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(INFORME_CONSERVACION, {
        inmuebleId
      })
      if (queryError) throw queryError
      informeConservacion.value = data.value?.informeConservacion || null
      return informeConservacion.value
    } catch (err) {
      error.value = `Error al generar informe de conservación: ${err.message}`
      console.error('Error en generarInformeConservacion:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const generarInformeProteccion = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(INFORME_PROTECCION, {
        filters: {
          comunidadAutonomaId: filters.comunidadAutonomaId,
          provinciaId: filters.provinciaId
        }
      })
      if (queryError) throw queryError
      informeProteccion.value = data.value?.informeProteccion || null
      return informeProteccion.value
    } catch (err) {
      error.value = `Error al generar informe de protección: ${err.message}`
      console.error('Error en generarInformeProteccion:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    estadisticas,
    informeConservacion,
    informeProteccion,
    loading,
    error,
    obtenerEstadisticas,
    generarInformeConservacion,
    generarInformeProteccion
  }
}