import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  LISTAR_DOCUMENTOS,
  OBTENER_DOCUMENTO,
  CREAR_DOCUMENTO,
  ACTUALIZAR_DOCUMENTO,
  ELIMINAR_DOCUMENTO
} from '../graphql/documentoQueries'

export function useDocumento() {
  const documentos = ref([])
  const documento = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const hasDocumentos = computed(() => documentos.value.length > 0)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await useQuery(LISTAR_DOCUMENTOS, {
        filters: {
          tipoDocumentoId: filters.tipoDocumentoId,
          tipoLicenciaId: filters.tipoLicenciaId,
          fuenteDocumentalId: filters.fuenteDocumentalId,
          nombre: filters.nombre,
          fechaDesde: filters.fechaDesde,
          fechaHasta: filters.fechaHasta,
          orderBy: filters.orderBy || ['createdAt_DESC']
        },
        pagination: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 20
        }
      })

      if (queryError) throw queryError

      const response = data.value?.documentos
      documentos.value = response?.items || []
      pagination.value.total = response?.total || 0
      pagination.value.totalPages = response?.totalPages || 0

      return { items: documentos.value, total: pagination.value.total }
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
      const { data, error: queryError } = await useQuery(OBTENER_DOCUMENTO, { id })

      if (queryError) throw queryError

      documento.value = data.value?.documento?.item || null
      return documento.value
    } catch (err) {
      error.value = `Error al obtener documento: ${err.message}`
      console.error('Error en obtener Documento:', err)
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
      const { data, errors } = await mutate({ input: inputData })

      if (errors) throw new Error(errors[0].message)

      const nuevo = data.crearDocumento.item
      documentos.value.unshift(nuevo)
      pagination.value.total++

      return nuevo
    } catch (err) {
      error.value = `Error al crear documento: ${err.message}`
      console.error('Error en crear Documento:', err)
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

      const actualizado = data.actualizarDocumento.item
      const index = documentos.value.findIndex(d => d.id === id)

      if (index !== -1) {
        documentos.value[index] = actualizado
      }

      return actualizado
    } catch (err) {
      error.value = `Error al actualizar documento: ${err.message}`
      console.error('Error en actualizar Documento:', err)
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

      documentos.value = documentos.value.filter(d => d.id !== id)
      pagination.value.total--

      return data.eliminarDocumento.success
    } catch (err) {
      error.value = `Error al eliminar documento: ${err.message}`
      console.error('Error en eliminar Documento:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cambiarPagina = (page) => {
    pagination.value.page = page
    return listar()
  }

  const reset = () => {
    documentos.value = []
    documento.value = null
    error.value = null
    pagination.value.page = 1
  }

  return {
    documentos,
    documento,
    loading,
    error,
    pagination,
    hasDocumentos,
    listar,
    obtener,
    crear,
    actualizar,
    eliminar,
    cambiarPagina,
    reset
  }
}