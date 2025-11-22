import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  OBTENER_OSM_EXT,
  CREAR_OSM_EXT,
  ACTUALIZAR_OSM_EXT,
  ELIMINAR_OSM_EXT,
  SINCRONIZAR_OSM
} from '../graphql/inmuebleOSMExtQueries'

export function useInmuebleOSMExt(inmuebleId) {
  const osmExt = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const sincronizando = ref(false)

  const obtener = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_OSM_EXT, { inmuebleId })
      osmExt.value = data.value?.inmuebleOSMExt?.item || null
      return osmExt.value
    } catch (err) {
      error.value = `Error al cargar datos OSM: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_OSM_EXT)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      osmExt.value = data.crearInmuebleOSMExt.item
      return osmExt.value
    } catch (err) {
      error.value = `Error al crear datos OSM: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_OSM_EXT)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      osmExt.value = data.actualizarInmuebleOSMExt.item
      return osmExt.value
    } catch (err) {
      error.value = `Error al actualizar datos OSM: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async () => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_OSM_EXT)
      const { data, errors } = await mutate({ inmuebleId })
      if (errors) throw new Error(errors[0].message)
      osmExt.value = null
      return data.eliminarInmuebleOSMExt.success
    } catch (err) {
      error.value = `Error al eliminar datos OSM: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const sincronizar = async () => {
    sincronizando.value = true
    error.value = null
    try {
      const { mutate } = useMutation(SINCRONIZAR_OSM)
      const { data, errors } = await mutate({ inmuebleId })
      if (errors) throw new Error(errors[0].message)
      osmExt.value = data.sincronizarOSM.item
      return osmExt.value
    } catch (err) {
      error.value = `Error al sincronizar con OSM: ${err.message}`
      throw err
    } finally {
      sincronizando.value = false
    }
  }

  return {
    osmExt,
    loading,
    sincronizando,
    error,
    obtener,
    crear,
    actualizar,
    eliminar,
    sincronizar
  }
}