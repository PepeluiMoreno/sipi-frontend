// modules/inmuebles/composables/useInmuebleDocumentos.js
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_DOCUMENTOS,
  OBTENER_DOCUMENTO,
  CREAR_DOCUMENTO,
  ACTUALIZAR_DOCUMENTO,
  ELIMINAR_DOCUMENTO
} from '../graphql/inmuebleDocumentoQueries'

export function useInmuebleDocumentos(inmuebleId) {
  const documentos = ref([])
  const documento = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: queryError } = await useQuery(LISTAR_DOCUMENTOS, {
        inmuebleId,
        filters: {
          tipo: filters.tipo,
          search: filters.search
        },
        orderBy: ['fechaDocumento_DESC', 'createdAt_DESC']
      })
      if (queryError) throw queryError
      documentos.value = data.value?.inmuebleDocumentos?.items || []
      return documentos.value
    } catch (err) {
      error.value = `Error al cargar documentos: ${err.message}`
      console.error('Error en listar Documentos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await useQuery(OBTENER_DOCUMENTO, { id })
      documento.value = data.value?.inmuebleDocumento?.item || null
      return documento.value
    } catch (err) {
      error.value = `Error al obtener documento: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const crear = async (inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(CREAR_DOCUMENTO)
      const { data, errors } = await mutate({
        inmuebleId,
        input: inputData
      })
      if (errors) throw new Error(errors[0].message)
      const nuevo = data.crearInmuebleDocumento.item
      documentos.value.unshift(nuevo)
      return nuevo
    } catch (err) {
      error.value = `Error al crear documento: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const actualizar = async (id, inputData) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ACTUALIZAR_DOCUMENTO)
      const { data, errors } = await mutate({ id, input: inputData })
      if (errors) throw new Error(errors[0].message)
      const actualizado = data.actualizarInmuebleDocumento.item
      const index = documentos.value.findIndex(i => i.id === id)
      if (index !== -1) documentos.value[index] = actualizado
      return actualizado
    } catch (err) {
      error.value = `Error al actualizar documento: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  const eliminar = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { mutate } = useMutation(ELIMINAR_DOCUMENTO)
      const { data, errors } = await mutate({ id })
      if (errors) throw new Error(errors[0].message)
      documentos.value = documentos.value.filter(i => i.id !== id)
      return data.eliminarInmuebleDocumento.success
    } catch (err) {
      error.value = `Error al eliminar documento: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed
  const documentosPorTipo = computed(() => {
    return documentos.value.reduce((acc, doc) => {
      const tipo = doc.tipo || 'Sin tipo'
      if (!acc[tipo]) acc[tipo] = []
      acc[tipo].push(doc)
      return acc
    }, {})
  })

  const tiposDocumentos = computed(() => {
    return [...new Set(documentos.value.map(doc => doc.tipo).filter(Boolean))]
  })

  return {
    documentos,
    documento,
    loading,
    error,
    documentosPorTipo,
    tiposDocumentos,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  }
}