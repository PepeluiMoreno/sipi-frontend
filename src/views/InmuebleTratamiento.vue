<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
    <!-- Filtros fijos arriba -->
    <div class="flex-shrink-0 bg-white rounded-lg shadow p-4 mb-4">
      <InmuebleFiltros 
        @location-selected="onLocationSelected"
        @filters-changed="onFiltersChanged"
      />
    </div>

    <!-- Contenido scrollable -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Mapa (50%) -->
      <div class="w-1/2 h-full bg-white rounded-lg shadow overflow-hidden relative">
        <InmuebleMapa 
          :selected-location="selectedLocation"
          :filters="activeFilters"
          @property-selected="onPropertySelected"
          class="w-full h-full"
        />
        <div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-600 flex items-center">
          <InformationCircleIcon class="w-4 h-4 mr-2 text-indigo-600" />
          Haga click sobre el inmueble en el mapa
        </div>
      </div>

      <!-- Formulario (50%) -->
      <div class="w-1/2 h-full overflow-hidden">
        <div class="bg-white rounded-lg shadow h-full flex flex-col">
          <InmuebleFormulario 
            v-if="selectedProperty"
            :property="selectedProperty"
            @close="selectedProperty = null"
            class="flex-1 overflow-y-auto"
          />
          <div v-else class="flex-1 flex items-center justify-center text-gray-500 p-6 text-center">
            <MapPinIcon class="w-12 h-12 text-gray-400 mb-4" />
            <p>Seleccione un inmueble del mapa</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InmuebleMapa from '../components/inmuebles/InmuebleMapa.vue'
import InmuebleFiltros from '../components/inmuebles/InmuebleFiltros.vue'
import InmuebleFormulario from '../components/inmuebles/InmuebleFormulario.vue'
import {
  InformationCircleIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'

const selectedLocation = ref(null)
const selectedProperty = ref(null)
const activeFilters = ref({})

const onLocationSelected = (location) => {
  selectedLocation.value = location
  selectedProperty.value = null
}

const onFiltersChanged = (filters) => {
  activeFilters.value = filters
}

const onPropertySelected = (property) => {
  selectedProperty.value = property
}
</script>