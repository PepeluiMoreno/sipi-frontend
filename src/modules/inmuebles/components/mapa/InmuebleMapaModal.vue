<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl w-[95vw] h-[95vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Mapa de Inmuebles</h2>
          <p class="text-gray-600 mt-1">Explore la ubicación geográfica del patrimonio</p>
        </div>
        <div class="flex items-center space-x-3">
          <div class="text-sm text-gray-500">
            {{ properties.length }} inmuebles
          </div>
          <button 
            @click="$emit('close')" 
            class="btn btn-ghost btn-sm"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden flex">
        <!-- Mapa principal -->
        <div class="flex-1 relative">
          <InmuebleMapa 
            :properties="properties"
            :selected-property="selectedProperty"
            :center="mapCenter"
            :zoom="mapZoom"
            @property-selected="onPropertySelected"
            class="w-full h-full"
          />
        </div>

        <!-- Panel lateral de información -->
        <div v-if="selectedProperty" class="w-96 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">Inmueble Seleccionado</h3>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <InmuebleCard 
              :property="selectedProperty"
              :is-selected="true"
              class="w-full"
            />
          </div>
          <div class="p-4 border-t border-gray-200">
            <button 
              @click="confirmSelection"
              class="w-full btn btn-primary"
            >
              <CheckIcon class="w-4 h-4 mr-2" />
              Seleccionar este inmueble
            </button>
          </div>
        </div>
      </div>

      <!-- Footer con controles -->
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
import { ref } from 'vue'
import { XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import InmuebleMapa from './InmuebleMapa.vue'
import InmuebleCard from '../cards/InmuebleCard.vue'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
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

const selectedProperty = ref(null)
const mapCenter = ref(props.initialCenter)
const mapZoom = ref(props.initialZoom)

const onPropertySelected = (property) => {
  selectedProperty.value = property
}

const confirmSelection = () => {
  if (selectedProperty.value) {
    emit('property-selected', selectedProperty.value)
    emit('close')
  }
}

const resetView = () => {
  mapCenter.value = props.initialCenter
  mapZoom.value = props.initialZoom
  selectedProperty.value = null
}
</script>

<style scoped>
/* Animación de entrada */
:deep(.fixed) {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>