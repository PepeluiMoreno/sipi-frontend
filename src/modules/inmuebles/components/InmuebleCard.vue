<!-- components/InmuebleCard.vue -->
<template>
  <div 
    @click="$emit('select', property)"
    class="flex-shrink-0 w-80 h-28 bg-white border border-gray-200 rounded-lg hover:shadow-lg cursor-pointer transition-all flex overflow-hidden"
  >
    <!-- Foto pequeña a la izquierda -->
    <div class="w-24 h-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
      <img 
        v-if="property.photo" 
        :src="property.photo" 
        :alt="property.denominacion_principal"
        class="w-full h-full object-cover"
      />
      <!-- AVATAR DE IGLESIA CATÓLICA -->
      <div v-else class="bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg w-16 h-16 flex items-center justify-center border border-stone-300">
        <BuildingLibraryIcon class="w-7 h-7 text-stone-600" />
      </div>
    </div>
    
    <!-- Contenido a la derecha -->
    <div class="flex-1 p-3 flex flex-col justify-between overflow-hidden">
      <!-- Nombre resaltado -->
      <h4 class="font-bold text-gray-900 text-sm mb-1 truncate leading-tight">
        {{ property.denominacion_principal || 'Sin denominación' }}
      </h4>
      
      <!-- Dirección y localidad (pequeño, sin negrita) -->
      <div class="text-[11px] text-gray-600 mb-1 leading-snug">
        <p class="truncate">{{ property.direccion_normalizada || 'Dirección no especificada' }}</p>
        <p>{{ property.localidad?.nombre || 'Localidad no especificada' }}</p>
      </div>
      
      <!-- Etiquetas de estado -->
      <div class="flex flex-wrap gap-0.5">
        <span 
          v-if="property.estado"
          class="px-1.5 py-0.5 text-[9px] font-medium text-white rounded-sm"
          :class="getEstadoColor(property.estado)"
        >
          {{ property.estado }}
        </span>
        <span 
          v-if="property.es_bic"
          class="px-1.5 py-0.5 text-[9px] font-medium text-white rounded-sm bg-purple-600"
        >
          BIC
        </span>
        <span 
          v-if="property.enVenta"
          class="px-1.5 py-0.5 text-[9px] font-medium text-white rounded-sm bg-yellow-600"
        >
          Venta
        </span>
        <span 
          v-if="property.vendido"
          class="px-1.5 py-0.5 text-[9px] font-medium text-white rounded-sm bg-orange-600"
        >
          Vendido
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BuildingLibraryIcon } from '@heroicons/vue/24/outline'
import { ESTADOS_INMUEBLE } from '../../../config/estadosInmueble'

defineProps(['property'])
defineEmits(['select'])

const getEstadoColor = (estado) => {
  const config = ESTADOS_INMUEBLE.find(e => e.label === estado)
  return config ? config.color + ' text-[9px]' : 'bg-gray-600'
}
</script>