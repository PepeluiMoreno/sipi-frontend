import { ref, computed } from 'vue'
import { mockInmuebles, ESTADO_MAPEO } from '../../core/mocks'

export function useInmueble() {
  const inmuebles = ref([])
  const inmueble = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const hasInmuebles = computed(() => inmuebles.value.length > 0)
  const isEmpty = computed(() => !loading.value && inmuebles.value.length === 0)

  const listar = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      console.log('🔍 Filtros recibidos:', filters)
      
      let filteredInmuebles = [...mockInmuebles]

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredInmuebles = filteredInmuebles.filter(inmueble => 
          inmueble.denominacion_principal?.toLowerCase().includes(searchTerm) ||
          inmueble.direccion?.toLowerCase().includes(searchTerm)
        )
      }

      if (filters.estados && Object.keys(filters.estados).length > 0) {
        const estadosActivos = Object.keys(filters.estados).filter(key => filters.estados[key])
        
        filteredInmuebles = filteredInmuebles.filter(inmueble => {
          const estadoKey = ESTADO_MAPEO[inmueble.estado]
          return estadoKey && estadosActivos.includes(estadoKey)
        })
      }
      
      // Filtro por provincia (usando datos mock)
      if (filters.provincia) {
        filteredInmuebles = filteredInmuebles.filter(inmueble => 
          inmueble.provincia === filters.provincia
        )
        console.log('📍 Después de provincia:', filteredInmuebles.length)
      }

      // Filtro por localidad (usando datos mock)
      if (filters.localidad) {
        filteredInmuebles = filteredInmuebles.filter(inmueble => 
          inmueble.localidad === filters.localidad
        )
        console.log('🏘️ Después de localidad:', filteredInmuebles.length)
      }

      inmuebles.value = filteredInmuebles
      console.log('🎉 Inmuebles filtrados:', inmuebles.value.length)
      
      return { items: inmuebles.value, total: filteredInmuebles.length }
    } catch (err) {
      error.value = `Error al cargar inmuebles: ${err.message}`
      console.error('❌ Error en listar Inmuebles:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const obtener = async (id) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const found = mockInmuebles.find(i => i.id === id)
      inmueble.value = found || null
      return inmueble.value
    } catch (err) {
      error.value = `Error al obtener inmueble: ${err.message}`
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    inmuebles,
    inmueble,
    loading,
    error,
    hasInmuebles,
    isEmpty,
    listar,
    obtener
  }
}