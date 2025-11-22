import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_TIPOS_MIME,
  OBTENER_TIPO_MIME,
  CREAR_TIPO_MIME,
  ACTUALIZAR_TIPO_MIME,
  ELIMINAR_TIPO_MIME
} from '../graphql/tipoMimeDocumentoQueries'

export function useTipoMimeDocumento() {
  const tiposMime = ref([])
  const tipoMime = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_TIPOS_MIME, {
        filters: {
          search: filters.search,
          orderBy: filters.orderBy || ['tipoMime_ASC']
        },
        pagination: filters.pagination || { page: 1, pageSize: 50 }
      })
      if (queryError) throw queryError
      tiposMime.value = data.value?.tiposMimeDocumento?.items || []
      return tiposMime.value
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
      const { data } = await useQuery(OBTENER_TIPO_MIME, { id })
      tipoMime.value = data.value?.tipoMimeDocumento?.item || null
      return tipoMime.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (input) => {
    loading.value = true
    try {
      const { mutate } = useMutation(CREAR_TIPO_MIME)
      const { data, errors } = await mutate({ input })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearTipoMimeDocumento.item
      tiposMime.value.unshift(nuevo)
      return nuevo
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, input) => {
    loading.value = true
    try {
      const { mutate } = useMutation(ACTUALIZAR_TIPO_MIME)
      const { data, errors } = await mutate({ id, input })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarTipoMimeDocumento.item
      const index = tiposMime.value.findIndex(i => i.id === id)
      if (index !== -1) tiposMime.value[index] = actualizado
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
      const { mutate } = useMutation(ELIMINAR_TIPO_MIME)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      tiposMime.value = tiposMime.value.filter(i => i.id !== id)
      return data.eliminarTipoMimeDocumento.success
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { tiposMime, tipoMime, loading, error, listar, obtener, crear, actualizar, eliminar }
}