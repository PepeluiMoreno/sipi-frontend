import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_DENOMINACIONES,
  OBTENER_DENOMINACION,
  CREAR_DENOMINACION,
  ACTUALIZAR_DENOMINACION,
  ELIMINAR_DENOMINACION,
  ESTABLECER_PRINCIPAL
} from '../graphql/inmuebleDenominacionQueries'

export function useInmuebleDenominacion(inmuebleId) {
  const denominaciones = ref([])
  const denominacion = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_DENOMINACIONES, {
        inmuebleId,
        orderBy: ['esPrincipal_DESC', 'denominacion_ASC']
      })
      if (queryError) throw queryError
      denominaciones.value = data.value?.inmuebleDenominaciones?.items || []
      return denominaciones.value
    } catch (err) {
      error.value = `Error al cargar denominaciones: ${err.message}`
      console.error('Error en listar Denominaciones:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_DENOMINACION, { id })
      denominacion.value = data.value?.inmuebleDenominacion?.item || null
      return denominacion.value
    } catch (err) {
      error.value = `Error al obtener denominación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_DENOMINACION)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nueva = data.crearInmuebleDenominacion.item
      denominaciones.value.unshift(nueva)
      return nueva
    } catch (err) {
      error.value = `Error al crear denominación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_DENOMINACION)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizada = data.actualizarInmuebleDenominacion.item
      const index = denominaciones.value.findIndex(i => i.id === id)
      if (index !== -1) denominaciones.value[index] = actualizada
      return actualizada
    } catch (err) {
      error.value = `Error al actualizar denominación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_DENOMINACION)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      denominaciones.value = denominaciones.value.filter(i => i.id !== id)
      return data.eliminarInmuebleDenominacion.success
    } catch (err) {
      error.value = `Error al eliminar denominación: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const establecerPrincipal = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ESTABLECER_PRINCIPAL)
      const { data, errors } = await mutate({ inmuebleId, denominacionId: id })
      if (errors) throw new Error(errors[0].message)
      await listar() // Recargar lista
      return data.establecerDenominacionPrincipal.success
    } catch (err) {
      error.value = `Error al establecer principal: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed
  const denominacionPrincipal = computed(() => {
    return denominaciones.value.find(d => d.esPrincipal) || null
  })

  const denominacionesAlternativas = computed(() => {
    return denominaciones.value.filter(d => !d.esPrincipal)
  })

  return {
    denominaciones,
    denominacion,
    denominacionPrincipal,
    denominacionesAlternativas,
    loading,
    error,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    establecerPrincipal
  }
}