<template>
  <div class="flex-1 overflow-hidden flex gap-4">
    <!-- SIDEBAR IZQUIERDO: Solo filtros -->
    <div class="w-80 flex-shrink-0">
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="font-semibold text-gray-900 mb-4">Ubicación</h3>
        <InmuebleFiltros 
          :selected-location="selectedLocation"
          @location-selected="onLocationSelected"
          @filters-changed="onFiltersChanged"
        />
      </div>
    </div>

    <!-- PANEL DERECHO: Dividido en superior (lista) e inferior (detalle) -->
    <div class="flex-1 flex flex-col gap-4">
      <!-- PANEL SUPERIOR: Lista scrollable de inmuebles -->
      <div class="bg-white rounded-lg shadow flex-1 overflow-hidden flex flex-col">
        <div class="px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h3 class="font-semibold text-gray-900">
            Inmuebles ({{ visibleProperties.length }})
          </h3>
        </div>
        <div class="flex-1 overflow-y-auto">
          <InmuebleDataGrid 
            :properties="visibleProperties"
            @property-selected="onPropertySelected"
          />
        </div>
      </div>

      <!-- PANEL INFERIOR: Detalle del inmueble con pestañas -->
      <div class="bg-white rounded-lg shadow flex-1 overflow-hidden">
        <InmuebleFormulario 
          v-if="selectedProperty" 
          :property="selectedProperty" 
          @close="selectedProperty = null" 
        />
        <div v-else class="h-full flex items-center justify-center text-gray-500">
          <div class="text-center py-12">
            <MapPinIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un inmueble</h3>
            <p class="text-gray-500">Haz click en un inmueble de la lista superior para ver sus detalles</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal del mapa -->
    <ModalMapa
      v-if="showMapModal"
      :selected-location="selectedLocation"
      :filters="activeFilters"
      @close="closeMapModal"
      @property-selected="onPropertySelectedFromModal"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, provide } from 'vue'
import InmuebleFiltros from '../components/inmuebles/InmuebleFiltros.vue'
import InmuebleDataGrid from '../components/inmuebles/InmuebleDataGrid.vue'
import InmuebleFormulario from '../components/inmuebles/InmuebleFormulario.vue'
import ModalMapa from '../components/inmuebles/ModalMapa.vue'
import { ESTADO_MAPEO, ESTADOS_INMUEBLE } from '../config/estadosInmueble'
import { mockInmuebles, printMockStats } from '../mocks/inmueblesMock'
import {
  MapPinIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

// Debug: Imprimir estadísticas de mocks en consola
printMockStats()

const selectedLocation = ref(null)
const visibleProperties = ref([...mockInmuebles])
const activeFilters = ref({})
const selectedProperty = ref(null)
const showMapModal = ref(false)

const updateVisibleProperties = () => {
  const filtered = mockInmuebles.filter(prop => {
    const estadoKey = ESTADO_MAPEO[prop.estado]
    
    if (activeFilters.value && estadoKey && activeFilters.value[estadoKey] === false) {
      return false
    }
      
    if (selectedLocation.value && selectedLocation.value.id && prop.localidadId !== selectedLocation.value.id) {
      return false
    }
      
    return true
  })
  
  visibleProperties.value = filtered
}

const onLocationSelected = (location) => {
  selectedLocation.value = location
  updateVisibleProperties()
}

const onFiltersChanged = (filters) => {
  activeFilters.value = filters
  updateVisibleProperties()
}

const onPropertySelected = (property) => {
  selectedProperty.value = property
}

const onVisiblePropertiesChanged = (properties) => {
  if (properties && properties.length > 0) {
    visibleProperties.value = properties
  }
}

const openMapModal = () => {
  showMapModal.value = true
}

const closeMapModal = () => {
  showMapModal.value = false
}

const onPropertySelectedFromModal = (property) => {
  selectedProperty.value = property
  showMapModal.value = false
}

watch([selectedLocation, activeFilters], () => {
  updateVisibleProperties()
}, { deep: true })

onMounted(() => {
  const initialFilters = {}
  ESTADOS_INMUEBLE.forEach(estado => {
    initialFilters[estado.key] = true
  })
  activeFilters.value = initialFilters
})

provide('mockInmuebles', mockInmuebles)
provide('estadoMapa', ESTADO_MAPEO)
</script>

<style scoped>
.flex-1.overflow-hidden.flex.gap-4 {
  min-height: 0;
}
</style>