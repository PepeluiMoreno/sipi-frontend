import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_DIOCESIS_TITULARES,
  OBTENER_DIOCESIS_TITULAR,
  CREAR_DIOCESIS_TITULAR,
  ACTUALIZAR_DIOCESIS_TITULAR,
  ELIMINAR_DIOCESIS_TITULAR
} from '../graphql/diocesisTitularQueries'

export function useDiocesisTitular(diocesisId) {
  const titulares = ref([])
  const titular = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(LISTAR_DIOCESIS_TITULARES, {
        diocesisId,
        orderBy: ['fechaInicio_DESC']
      })
      titulares.value = data.value?.diocesisTitulares?.items || []
      return titulares.value
    } catch (err) {
      error.value = `Error al cargar titulares: ${err.message}`
      console.error('Error en listar DiocesisTitulares:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_DIOCESIS_TITULAR, { id })
      titular.value = data.value?.diocesisTitular?.item || null
      return titular.value
    } catch (err) {
      error.value = `Error al obtener titular: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_DIOCESIS_TITULAR)
      const { data, errors } = await mutate({
        diocesisId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearDiocesisTitular.item
      titulares.value.unshift(nuevo)
      return nuevo
    } catch (err) {
      error.value = `Error al crear titular: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_DIOCESIS_TITULAR)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarDiocesisTitular.item
      const index = titulares.value.findIndex(i => i.id === id)
      if (index !== -1) titulares.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = `Error al actualizar titular: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_DIOCESIS_TITULAR)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      titulares.value = titulares.value.filter(i => i.id !== id)
      return data.eliminarDiocesisTitular.success
    } catch (err) {
      error.value = `Error al eliminar titular: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    titulares,
    titular,
    loading,
    error,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  }
}