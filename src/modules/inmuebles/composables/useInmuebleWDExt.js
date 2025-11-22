import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  OBTENER_WD_EXT,
  CREAR_WD_EXT,
  ACTUALIZAR_WD_EXT,
  ELIMINAR_WD_EXT,
  SINCRONIZAR_WD
} from '../graphql/inmuebleWDExtQueries'

export function useInmuebleWDExt(inmuebleId) {
  const wdExt = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const sincronizando = ref(false)

  const obtener = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_WD_EXT, { inmuebleId })
      wdExt.value = data.value?.inmuebleWDExt?.item || null
      return wdExt.value
    } catch (err) {
      error.value = `Error al cargar datos Wikidata: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_WD_EXT)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      wdExt.value = data.crearInmuebleWDExt.item
      return wdExt.value
    } catch (err) {
      error.value = `Error al crear datos Wikidata: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_WD_EXT)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      wdExt.value = data.actualizarInmuebleWDExt.item
      return wdExt.value
    } catch (err) {
      error.value = `Error al actualizar datos Wikidata: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async () => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_WD_EXT)
      const { data, errors } = await mutate({ inmuebleId })
      if (errors) throw new Error(errors[0].message)
      wdExt.value = null
      return data.eliminarInmuebleWDExt.success
    } catch (err) {
      error.value = `Error al eliminar datos Wikidata: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const sincronizar = async () => {
    sincronizando.value = true
    error.value = null
    try {
      const { mutate } = useMutation(SINCRONIZAR_WD)
      const { data, errors } = await mutate({ inmuebleId })
      if (errors) throw new Error(errors[0].message)
      wdExt.value = data.sincronizarWikidata.item
      return wdExt.value
    } catch (err) {
      error.value = `Error al sincronizar con Wikidata: ${err.message}`
      throw err
    } finally {
      sincronizando.value = false
    }
  }

  return {
    wdExt,
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