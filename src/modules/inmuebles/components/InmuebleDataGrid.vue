<!-- components/InmuebleDataGrid.vue -->
<template>
  <div class="h-48 overflow-hidden">
    <!-- ESTADO INICIAL: Sin selección de ubicación -->
    <div v-if="!hasSelection && properties.length === 0" class="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
      <MapPinIcon class="w-12 h-12 text-gray-400 mx-auto mb-3" />
      <p class="text-sm font-medium text-gray-600 mb-1">Localice los inmuebles a tratar</p>
      <p class="text-xs text-gray-500">Use los filtros geográficos del panel izquierdo</p>
    </div>
    
    <!-- ESTADO SIN RESULTADOS: Después de filtrar no hay inmuebles -->
    <div v-else-if="properties.length === 0" class="h-full flex items-center justify-center p-6 text-center text-gray-500">
      <MapPinIcon class="w-10 h-10 text-gray-400 mx-auto mb-2" />
      <p class="text-sm">No hay inmuebles en esta área</p>
    </div>
    
    <!-- ESTADO CON RESULTADOS: Muestra tarjetas -->
    <div v-else class="h-full overflow-x-auto overflow-y-hidden">
      <div class="flex gap-4 p-4 h-full items-start" style="width: max-content;">
        <InmuebleCard 
          v-for="property in properties" 
          :key="property.id"
          :property="property"
          @select="$emit('property-selected', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'
import InmuebleCard from './InmuebleCard.vue'

defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  hasSelection: {
    type: Boolean,
    default: false
  }
})
defineEmits(['property-selected'])
</script>