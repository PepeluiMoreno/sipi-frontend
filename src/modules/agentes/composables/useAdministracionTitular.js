import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_ADMINISTRACIONES_TITULARES,
  OBTENER_ADMINISTRACION_TITULAR,
  CREAR_ADMINISTRACION_TITULAR,
  ACTUALIZAR_ADMINISTRACION_TITULAR,
  ELIMINAR_ADMINISTRACION_TITULAR
} from '../graphql/administracionTitularQueries'

export function useAdministracionTitular(administracionId) {
  const titulares = ref([])
  const titular = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async () => {
    loading.value = true
    try {
      const { data } = await useQuery(LISTAR_ADMINISTRACIONES_TITULARES, {
        administracionId,
        orderBy: ['fechaInicio_DESC']
      })
      titulares.value = data.value?.administracionTitulares?.items || []
      return titulares.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    try {
      const { data } = await useQuery(OBTENER_ADMINISTRACION_TITULAR, { id })
      titular.value = data.value?.administracionTitular?.item || null
      return titular.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    try {
      const { mutate } = useMutation(CREAR_ADMINISTRACION_TITULAR)
      const { data, errors } = await mutate({
        administracionId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearAdministracionTitular.item
      titulares.value.unshift(nuevo)
      return nuevo
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    try {
      const { mutate } = useMutation(ACTUALIZAR_ADMINISTRACION_TITULAR)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarAdministracionTitular.item
      const index = titulares.value.findIndex(i => i.id === id)
      if (index !== -1) titulares.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    try {
      const { mutate } = useMutation(ELIMINAR_ADMINISTRACION_TITULAR)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      titulares.value = titulares.value.filter(i => i.id !== id)
      return data.eliminarAdministracionTitular.success
    } catch (err) {
      error.value = err.message
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