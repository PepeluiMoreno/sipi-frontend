// modules/inmuebles/composables/useInmuebleTransmisiones.js
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_TRANSMISIONES,
  OBTENER_TRANSMISION,
  CREAR_TRANSMISION,
  ACTUALIZAR_TRANSMISION,
  ELIMINAR_TRANSMISION,
  GENERAR_CEDULA_TRANSMISION
} from '../graphql/inmuebleTransmisionQueries'

export function useInmuebleTransmisiones(inmuebleId) {
  const transmisiones = ref([])
  const transmision = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const generandoCedula = ref(false)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_TRANSMISIONES, {
        inmuebleId,
        filters: {
          tipoTransmision: filters.tipoTransmision,
          fechaDesde: filters.fechaDesde,
          fechaHasta: filters.fechaHasta,
          conDocumento: filters.conDocumento
        },
        orderBy: ['fechaTransmision_DESC']
      })
      if (queryError) throw queryError
      transmisiones.value = data.value?.inmuebleTransmisiones?.items || []
      return transmisiones.value
    } catch (err) {
      error.value = `Error al cargar transmisiones: ${err.message}`
      console.error('Error en listar Transmisiones:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_TRANSMISION, { id })
      transmision.value = data.value?.inmuebleTransmision?.item || null
      return transmision.value
    } catch (err) {
      error.value = `Error al obtener transmisión: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_TRANSMISION)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nueva = data.crearInmuebleTransmision.item
      transmisiones.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = `Error al crear transmisión: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_TRANSMISION)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizada = data.actualizarInmuebleTransmision.item
      const index = transmisiones.value.findIndex(i => i.id === id)
      if (index !== -1) transmisiones.value[index] = actualizada
      return actualizada
    } catch (err) {
      error.value = `Error al actualizar transmisión: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_TRANSMISION)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      transmisiones.value = transmisiones.value.filter(i => i.id !== id)
      return data.eliminarInmuebleTransmision.success
    } catch (err) {
      error.value = `Error al eliminar transmisión: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const generarCedula = async (transmisionId) => {
    generandoCedula.value = true
    error.value = null
    try {
      const { mutate } = useMutation(GENERAR_CEDULA_TRANSMISION)
      const { data, errors } = await mutate({ transmisionId })
      if (errors) throw new Error(errors[0].message)
      return data.generarCedulaTransmision.documento
    } catch (err) {
      error.value = `Error al generar cédula de transmisión: ${err.message}`
      throw err
    } finally {
      generandoCedula.value = false
    }
  }

  // Computed properties
  const transmisionesPorTipo = computed(() => {
    return transmisiones.value.reduce((acc, transmision) => {
      const tipo = transmision.tipoTransmision || 'Sin tipo'
      if (!acc[tipo]) acc[tipo] = []
      acc[tipo].push(transmision)
      return acc
    }, {})
  })

  const ultimaTransmision = computed(() => {
    return transmisiones.value.length > 0 ? transmisiones.value[0] : null
  })

  const transmisionesConDocumento = computed(() => {
    return transmisiones.value.filter(t => t.documentoId !== null)
  })

  const transmisionesRecientes = computed(() => {
    const seisMesesAtras = new Date()
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6)
    
    return transmisiones.value.filter(t => 
      t.fechaTransmision && new Date(t.fechaTransmision) > seisMesesAtras
    )
  })

  const tieneTransmisionesPendientes = computed(() => {
    return transmisiones.value.some(t => 
      t.estado === 'Pendiente' || t.estado === 'En trámite'
    )
  })

  return {
    transmisiones,
    transmision,
    loading,
    generandoCedula,
    error,
    transmisionesPorTipo,
    ultimaTransmision,
    transmisionesConDocumento,
    transmisionesRecientes,
    tieneTransmisionesPendientes,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    generarCedula
  }
}