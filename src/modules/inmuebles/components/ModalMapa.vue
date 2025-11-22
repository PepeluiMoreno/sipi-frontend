<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 class="text-xl font-semibold text-gray-900">Explorar Inmuebles en Mapa</h2>
        <div class="flex gap-3">
          <button 
            @click="selectCurrentProperty" 
            :disabled="!currentSelectedProperty"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Seleccionar
          </button>
          <button 
            @click="$emit('close')" 
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden flex">
        <!-- Mapa grande -->
        <div class="flex-1 relative" style="z-index: 1;">
          <InmuebleMapa 
            ref="modalMapRef"
            :selected-location="selectedLocation"
            :filters="filters"
            :is-mini="false"
            @property-selected="onPropertySelected"
            @visible-properties-changed="onVisiblePropertiesChanged"
            class="w-full h-full"
          />
        </div>

        <!-- Lista de inmuebles visibles -->
        <div class="w-96 bg-gray-50 border-l border-gray-200 flex flex-col flex-shrink-0" style="z-index: 2;">
          <div class="p-4 border-b border-gray-200 bg-white">
            <h3 class="font-semibold text-gray-900">
              Inmuebles en vista ({{ visibleProperties.length }})
            </h3>
            <p class="text-sm text-gray-500 mt-1">Haz click en una tarjeta para seleccionar</p>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <InmuebleListaModal 
              v-for="property in visibleProperties" 
              :key="property.id"
              :property="property"
              :is-selected="currentSelectedProperty?.id === property.id"
              @select="onPropertySelected"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InmuebleMapa from './InmuebleMapa.vue'
import InmuebleListaModal from './InmuebleListaModal.vue'

const props = defineProps({
  selectedLocation: Object,
  filters: Object
})

const emit = defineEmits(['close', 'property-selected'])

const modalMapRef = ref(null)
const visibleProperties = ref([])
const currentSelectedProperty = ref(null)

const onPropertySelected = (property) => {
  currentSelectedProperty.value = property
}

const onVisiblePropertiesChanged = (properties) => {
  visibleProperties.value = properties
}

const selectCurrentProperty = () => {
  if (currentSelectedProperty.value) {
    emit('property-selected', currentSelectedProperty.value)
  }
}

// Forzar actualización inicial al montar
onMounted(() => {
  setTimeout(() => {
    if (modalMapRef.value) {
      modalMapRef.value.updateVisibleProperties()
    }
  }, 500)
})
</script>