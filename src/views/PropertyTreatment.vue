<template>
  <div class="h-[calc(100vh-8rem)] overflow-hidden">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Tratamiento de Inmuebles</h1>
    
    <div class="flex h-full gap-6">
      <!-- Panel izquierdo: Mapa -->
      <div class="w-2/3 bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="font-semibold text-gray-900">Mapa de Inmuebles</h2>
          <div class="flex items-center space-x-2">
            <InformationCircleIcon class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-500">Haz clic en un marcador para seleccionar</span>
          </div>
        </div>
        <TreatmentMap 
          :selected-location="selectedLocation"
          :selected-properties="selectedProperties"
          @property-selected="addPropertyToList"
          class="h-[calc(100%-5rem)]"
        />
      </div>

      <!-- Panel derecho: Filtros + Lista -->
      <div class="w-1/3 flex flex-col space-y-6">
        <!-- Filtros jerárquicos -->
        <TreatmentFilters 
          @location-selected="onLocationSelected"
          class="bg-white rounded-lg shadow p-6"
        />

        <!-- Lista de inmuebles seleccionados -->
        <div class="flex-1 bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="font-semibold text-gray-900">
              Seleccionados ({{ selectedProperties.length }})
            </h2>
            <span v-if="selectedLocation" class="text-sm text-green-600">
              {{ selectedLocation.localidad }}
            </span>
          </div>
          <TreatmentList 
            :properties="selectedProperties"
            :can-add="!!selectedLocation"
            :location-id="selectedLocation?.id"
            @add-property="addPropertyToList"
            @remove-property="removeProperty"
            class="h-[calc(100%-5rem)]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreatmentMap from '../components/properties/TreatmentMap.vue'
import TreatmentFilters from '../components/properties/TreatmentFilters.vue'
import TreatmentList from '../components/properties/TreatmentList.vue'
import {
  InformationCircleIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const selectedLocation = ref(null)
const selectedProperties = ref([])

const onLocationSelected = (location) => {
  selectedLocation.value = location
  // Limpiar selección anterior si cambia la localidad
  selectedProperties.value = []
}

const addPropertyToList = (property) => {
  if (!selectedProperties.value.find(p => p.id === property.id)) {
    selectedProperties.value.push(property)
  }
}

const removeProperty = (propertyId) => {
  selectedProperties.value = selectedProperties.value.filter(p => p.id !== propertyId)
}
</script>