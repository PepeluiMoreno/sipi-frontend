import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { 
  LISTAR_TIPOS_LICENCIA,
  OBTENER_TIPO_LICENCIA,
  CREAR_TIPO_LICENCIA,
  ACTUALIZAR_TIPO_LICENCIA,
  ELIMINAR_TIPO_LICENCIA
} from '../graphql/tipoLicenciaQueries'

/**
 * Composable específico para el catálogo complejo de Tipos de Licencia
 */
export function useTipoLicencia() {
  const tiposLicencia = ref([])
  const tipoLicencia = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Query: Listar con filtros avanzados
  const listarTiposLicencia = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: queryError } = await useQuery(LISTAR_TIPOS_LICENCIA, {
        filters: {
          esLibre: filters.esLibre,
          esOpenSource: filters.esOpenSource,
          familia: filters.familia,
          obsoleta: filters.obsoleta,
          recomendada: filters.recomendada,
          search: filters.search,
          orderBy: filters.orderBy || ['popularidad_DESC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 50
        }
      })

      if (queryError) throw queryError

      tiposLicencia.value = data.value?.tiposLicencia?.items || []
      const total = data.value?.tiposLicencia?.total || 0
      
      return { items: tiposLicencia.value, total }
    } catch (err) {
      error.value = err.message || 'Error al cargar tipos de licencia'
      console.error('Error en listarTiposLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Query: Obtener detalle completo
  const obtenerTipoLicencia = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: queryError } = await useQuery(OBTENER_TIPO_LICENCIA, { id })

      if (queryError) throw queryError

      tipoLicencia.value = data.value?.tipoLicencia?.item || null
      return tipoLicencia.value
    } catch (err) {
      error.value = err.message || 'Error al obtener tipo de licencia'
      console.error('Error en obtenerTipoLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mutation: Crear
  const crearTipoLicencia = async (inputData) => {
    loading.value = true
    error.value = null
    
    try {
      const { mutate } = useMutation(CREAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nuevoTipo = data.tipoLicencia.item
      tiposLicencia.value.unshift(nuevoTipo)
      
      return nuevoTipo
    } catch (err) {
      error.value = err.message || 'Error al crear tipo de licencia'
      console.error('Error en crearTipoLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mutation: Actualizar
  const actualizarTipoLicencia = async (id, inputData) => {
    loading.value = true
    error.value = null
    
    try {
      const { mutate } = useMutation(ACTUALIZAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ id, input: inputData })

      if (errors) throw new Error(errors[0].message)

      const itemActualizado = data.tipoLicencia.item
      const index = tiposLicencia.value.findIndex(i => i.id === id)
      
      if (index !== -1) {
        tiposLicencia.value[index] = itemActualizado
      }
      
      return itemActualizado
    } catch (err) {
      error.value = err.message || 'Error al actualizar tipo de licencia'
      console.error('Error en actualizarTipoLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mutation: Eliminar
  const eliminarTipoLicencia = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { mutate } = useMutation(ELIMINAR_TIPO_LICENCIA)
      const { data, errors } = await mutate({ id })

      if (errors) throw new Error(errors[0].message)

      tiposLicencia.value = tiposLicencia.value.filter(i => i.id !== id)
      
      return data.tipoLicencia.success
    } catch (err) {
      error.value = err.message || 'Error al eliminar tipo de licencia'
      console.error('Error en eliminarTipoLicencia:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helpers para validación
  const validarCompatibilidad = (tipoLicencia) => {
    if (tipoLicencia.permite_uso_comercial && tipoLicencia.requiere_compartir_igual) {
      return { valido: false, mensaje: 'Copyleft requiere compartir-igual' }
    }
    return { valido: true }
  }

  return {
    tiposLicencia,
    tipoLicencia,
    loading,
    error,
    
    listarTiposLicencia,
    obtenerTipoLicencia,
    crearTipoLicencia,
    actualizarTipoLicencia,
    eliminarTipoLicencia,
    validarCompatibilidad
  }
}