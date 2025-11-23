import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'

export function useCatalogoBase(catalogoNombre, options = {}) {
  const { conContacto = false } = options
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pageSize: 50, total: 0 })

  // Import dinámico pero con import() en lugar de require()
  const loadQueries = async () => {
    const module = await import(`../graphql/${catalogoNombre}Queries.js`)
    return module
  }

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const queries = await loadQueries()
      const { LISTAR } = queries

      const { result, error: queryError, onResult } = useQuery(LISTAR, {
        filters,
        pagination: {
          page: pagination.value.page,
          pageSize: pagination.value.pageSize
        }
      })

      await new Promise((resolve) => {
        const stop = onResult(({ data }) => {
          const response = data?.[catalogoNombre]
          items.value = response?.items || []
          pagination.value.total = response?.total || 0
          stop()
          resolve()
        })
      })

      if (queryError.value) throw queryError.value

      return { items: items.value, total: pagination.value.total }
    } catch (err) {
      error.value = `Error al cargar ${catalogoNombre}: ${err.message}`
      console.error(`Error en listar ${catalogoNombre}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    pagination,
    listar
  }
}