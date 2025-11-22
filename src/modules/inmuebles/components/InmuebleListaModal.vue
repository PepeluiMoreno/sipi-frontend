<template>
  <div 
    @click="$emit('select', property)"
    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
    :class="{ 'ring-2 ring-indigo-500': isSelected }"
  >
    <!-- Imagen o avatar -->
    <div class="w-full h-24 bg-gray-100 overflow-hidden flex items-center justify-center">
      <img 
        v-if="property.photo" 
        :src="property.photo" 
        :alt="property.direccion"
        class="w-full h-full object-cover"
      />
      <div v-else class="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
        <BuildingOfficeIcon class="w-6 h-6 text-gray-500" />
      </div>
    </div>
    
    <!-- Contenido -->
    <div class="p-3">
      <h4 class="font-medium text-gray-900 text-sm truncate mb-1">
        {{ property.direccion }}
      </h4>
      <p class="text-xs text-gray-500 mb-2">
        {{ property.localidad }}, {{ property.provincia }}
      </p>
      
      <!-- Etiquetas de estado (video invertido) -->
      <div class="flex flex-wrap gap-1">
        <span 
          v-if="property.estado"
          class="px-2 py-1 text-xs font-medium text-white rounded"
          :class="getEstadoColorClass(property.estado)"
        >
          {{ property.estado }}
        </span>
        <span 
          v-if="property.bic"
          class="px-2 py-1 text-xs font-medium text-white rounded bg-purple-600"
        >
          BIC
        </span>
        <span 
          v-if="property.enVenta"
          class="px-2 py-1 text-xs font-medium text-white rounded bg-yellow-600"
        >
          En venta
        </span>
        <span 
          v-if="property.vendido"
          class="px-2 py-1 text-xs font-medium text-white rounded bg-orange-600"
        >
          Vendido
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import { ESTADOS_INMUEBLE } from '../../core/mocks'

defineProps(['property', 'isSelected'])
defineEmits(['select'])

const getEstadoColorClass = (estadoLabel) => {
  const estado = ESTADOS_INMUEBLE.find(e => e.label === estadoLabel)
  // Mapeo de colores para video invertido (texto blanco, fondo oscuro)
  const colorMap = {
    'bg-gray-600': 'bg-gray-700',
    'bg-green-600': 'bg-green-700',
    'bg-orange-600': 'bg-orange-700',
    'bg-purple-600': 'bg-purple-700',
    'bg-yellow-600': 'bg-yellow-700'
  }
  return estado ? colorMap[estado.color] || estado.color : 'bg-gray-700'
}
</script>