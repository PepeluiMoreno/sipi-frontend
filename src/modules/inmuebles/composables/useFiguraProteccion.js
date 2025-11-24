// modules/inmuebles/composables/useInmuebleProteccion.js
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_FIGURAS_PROTECCION,
  OBTENER_FIGURA_PROTECCION,
  CREAR_FIGURA_PROTECCION,
  ACTUALIZAR_FIGURA_PROTECCION,
  ELIMINAR_FIGURA_PROTECCION
} from '../graphql/inmuebleProteccionQueries'

export function useInmuebleProteccion(inmuebleId) {
  const figurasProteccion = ref([])
  const figuraProteccion = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_FIGURAS_PROTECCION, {
        inmuebleId,
        orderBy: ['fechaDeclaracion_DESC']
      })
      if (queryError) throw queryError
      figurasProteccion.value = data.value?.inmuebleFigurasProteccion?.items || []
      return figurasProteccion.value
    } catch (err) {
      error.value = `Error al cargar figuras de protección: ${err.message}`
      console.error('Error en listar Figuras Protección:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_FIGURA_PROTECCION, { id })
      figuraProteccion.value = data.value?.inmuebleFiguraProteccion?.item || null
      return figuraProteccion.value
    } catch (err) {
      error.value = `Error al obtener figura de protección: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_FIGURA_PROTECCION)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nueva = data.crearInmuebleFiguraProteccion.item
      figurasProteccion.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = `Error al crear figura de protección: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_FIGURA_PROTECCION)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizada = data.actualizarInmuebleFiguraProteccion.item
      const index = figurasProteccion.value.findIndex(i => i.id === id)
      if (index !== -1) figurasProteccion.value[index] = actualizada
      return actualizada
    } catch (err) {
      error.value = `Error al actualizar figura de protección: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_FIGURA_PROTECCION)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      figurasProteccion.value = figurasProteccion.value.filter(i => i.id !== id)
      return data.eliminarInmuebleFiguraProteccion.success
    } catch (err) {
      error.value = `Error al eliminar figura de protección: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed
  const tieneProteccion = computed(() => figurasProteccion.value.length > 0)
  
  const nivelMaximoProteccion = computed(() => {
    if (!figurasProteccion.value.length) return null
    
    const niveles = {
      'BIC': 4,
      'Bien de Interés Cultural': 4,
      'Bien Inventariado': 3,
      'Bien Catalogado': 3,
      'Bien Protegido': 2,
      'Área de Protección': 1
    }
    
    return figurasProteccion.value.reduce((max, figura) => {
      const nivel = niveles[figura.tipo] || 0
      return nivel > max ? nivel : max
    }, 0)
  })

  return {
    figurasProteccion,
    figuraProteccion,
    loading,
    error,
    tieneProteccion,
    nivelMaximoProteccion,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  }
}