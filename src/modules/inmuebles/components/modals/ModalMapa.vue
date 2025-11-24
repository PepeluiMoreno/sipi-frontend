<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Explorar Inmuebles en Mapa</h2>
          <p class="text-gray-600 mt-1">Seleccione un inmueble haciendo click en el mapa o en la lista</p>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="selectCurrentProperty" 
            :disabled="!currentSelectedProperty"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <CheckIcon class="w-4 h-4 mr-2" />
            Seleccionar
          </button>
          <button 
            @click="$emit('close')" 
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden flex">
        <!-- Mapa grande -->
        <div class="flex-1 relative">
          <InmuebleMapa 
            ref="modalMapRef"
            :properties="properties"
            :selected-property="currentSelectedProperty"
            :center="mapCenter"
            :zoom="mapZoom"
            @property-selected="onPropertySelected"
            @visible-properties-changed="onVisiblePropertiesChanged"
            class="w-full h-full"
          />
        </div>

        <!-- Lista de inmuebles visibles -->
        <div class="w-96 bg-gray-50 border-l border-gray-200 flex flex-col flex-shrink-0">
          <div class="p-4 border-b border-gray-200 bg-white">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-900">
                Inmuebles en vista
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ visibleProperties.length }}
              </span>
            </div>
            
            <!-- Filtros rápidos en el modal -->
            <div class="space-y-2">
              <input
                v-model="busquedaLocal"
                type="text"
                placeholder="Filtrar en esta vista..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="estado in estadosFiltro"
                  :key="estado.key"
                  @click="toggleFiltroEstado(estado.key)"
                  class="inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-colors"
                  :class="getFiltroEstadoClass(estado.key)"
                >
                  <span class="w-2 h-2 rounded-full mr-1" :class="estado.color"></span>
                  {{ estado.label }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-3">
              <InmuebleListaModal 
                v-for="property in propiedadesFiltradas" 
                :key="property.id"
                :property="property"
                :is-selected="currentSelectedProperty?.id === property.id"
                @select="onPropertySelected"
              />
              
              <!-- Estado vacío -->
              <div 
                v-if="propiedadesFiltradas.length === 0"
                class="text-center py-8 text-gray-500"
              >
                <MapPinIcon class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p class="text-sm">No hay inmuebles en esta vista</p>
                <p class="text-xs mt-1">Ajuste los filtros o zoom del mapa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer con controles del mapa -->
      <div class="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span>No investigado</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Inmatriculado</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-orange-600 rounded-full"></div>
            <span>Vendido</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>BIC</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="resetView"
            class="btn btn-secondary btn-sm"
          >
            <ArrowPathIcon class="w-4 h-4 mr-2" />
            Vista inicial
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
  XMarkIcon, 
  CheckIcon, 
  ArrowPathIcon,
  MapPinIcon 
} from '@heroicons/vue/24/outline'
import InmuebleMapa from '../mapa/InmuebleMapa.vue'
import InmuebleListaModal from '../InmuebleListaModal.vue'
import { ESTADOS_INMUEBLE, ESTADO_MAPEO } from '../../mocks'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  selectedLocation: {
    type: Object,
    default: null
  },
  filters: {
    type: Object,
    default: () => ({})
  },
  initialCenter: {
    type: Array,
    default: () => [40.0, -3.0]
  },
  initialZoom: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['close', 'property-selected'])

const modalMapRef = ref(null)
const visibleProperties = ref([])
const currentSelectedProperty = ref(null)
const busquedaLocal = ref('')
const filtrosEstado = ref({})
const mapCenter = ref(props.initialCenter)
const mapZoom = ref(props.initialZoom)

// Inicializar filtros de estado
const estadosFiltro = ESTADOS_INMUEBLE
estadosFiltro.forEach(estado => {
  filtrosEstado.value[estado.key] = true
})

// Propiedades filtradas
const propiedadesFiltradas = computed(() => {
  return visibleProperties.value.filter(property => {
    // Filtro de búsqueda
    if (busquedaLocal.value) {
      const termino = busquedaLocal.value.toLowerCase()
      const textoBusqueda = `${property.nombre} ${property.denominacion_principal} ${property.direccion} ${property.localidad?.nombre}`.toLowerCase()
      if (!textoBusqueda.includes(termino)) return false
    }

    // Filtro de estado
    const estadoKey = ESTADO_MAPEO[property.estado]
    if (estadoKey && !filtrosEstado.value[estadoKey]) {
      return false
    }

    return true
  })
})

const onPropertySelected = (property) => {
  currentSelectedProperty.value = property
}

const onVisiblePropertiesChanged = (properties) => {
  visibleProperties.value = properties
}

const selectCurrentProperty = () => {
  if (currentSelectedProperty.value) {
    emit('property-selected', currentSelectedProperty.value)
    emit('close')
  }
}

const resetView = () => {
  mapCenter.value = props.initialCenter
  mapZoom.value = props.initialZoom
  currentSelectedProperty.value = null
  busquedaLocal.value = ''
  
  // Resetear filtros de estado
  estadosFiltro.forEach(estado => {
    filtrosEstado.value[estado.key] = true
  })
}

const toggleFiltroEstado = (estadoKey) => {
  filtrosEstado.value[estadoKey] = !filtrosEstado.value[estadoKey]
}

const getFiltroEstadoClass = (estadoKey) => {
  const isActive = filtrosEstado.value[estadoKey]
  return isActive 
    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
}

// Forzar actualización inicial al montar
onMounted(() => {
  setTimeout(() => {
    if (modalMapRef.value) {
      modalMapRef.value.updateVisibleProperties()
    }
  }, 500)
})

// Cerrar con ESC
const onKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

// Manejar eventos de teclado
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* Animaciones mejoradas para el modal */
:deep(.fixed) {
  animation: fadeIn 0.3s ease-out;
}

:deep(.bg-white) {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>