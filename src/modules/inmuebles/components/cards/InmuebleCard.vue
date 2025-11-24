<template>
  <div 
    class="group bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg"
    :class="{
      'border-indigo-500 shadow-lg ring-2 ring-indigo-100': isSelected,
      'border-gray-100 hover:border-indigo-200': !isSelected
    }"
    @click="$emit('select', property)"
  >
    <!-- Imagen con overlay de estado -->
    <div class="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <img 
        v-if="property.photo" 
        :src="property.photo" 
        :alt="property.denominacion_principal"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <div class="text-center">
          <BuildingLibraryIcon class="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <span class="text-xs text-stone-500 block">Sin imagen</span>
        </div>
      </div>
      
      <!-- Badges superiores -->
      <div class="absolute top-2 left-2 flex flex-wrap gap-1">
        <InmuebleBadgeEstado :estado="property.estado" />
        <InmuebleBadgeBIC v-if="property.es_bic" />
        <InmuebleBadgeVenta v-if="property.enVenta" />
      </div>
      
      <!-- Acciones rápidas -->
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        <button class="btn btn-ghost btn-sm !p-1 !bg-white/90 backdrop-blur-sm">
          <EyeIcon class="w-4 h-4" />
        </button>
        <button class="btn btn-ghost btn-sm !p-1 !bg-white/90 backdrop-blur-sm">
          <MapPinIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-4">
      <!-- Header -->
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1 mr-2">
          {{ property.denominacion_principal || 'Sin denominación' }}
        </h3>
        <button class="btn btn-ghost btn-sm !p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <EllipsisHorizontalIcon class="w-4 h-4" />
        </button>
      </div>

      <!-- Ubicación -->
      <div class="flex items-center text-xs text-gray-500 mb-3">
        <MapPinIcon class="w-3 h-3 mr-1 flex-shrink-0" />
        <span class="truncate">{{ property.direccion_normalizada || 'Dirección no especificada' }}</span>
      </div>

      <!-- Metadatos -->
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>{{ property.localidad?.nombre || 'Localidad no especificada' }}</span>
        <span v-if="property.updated_at">{{ formatFechaRelativa(property.updated_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BuildingLibraryIcon,
  EyeIcon,
  MapPinIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline'
import InmuebleBadgeEstado from '../ui/InmuebleBadgeEstado.vue'
import InmuebleBadgeBIC from '../ui/InmuebleBadgeBIC.vue'
import InmuebleBadgeVenta from '../ui/InmuebleBadgeVenta.vue'

defineProps({
  property: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])

const formatFechaRelativa = (fecha) => {
  if (!fecha) return ''
  const ahora = new Date()
  const fechaObj = new Date(fecha)
  const diffTime = Math.abs(ahora - fechaObj)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Hoy'
  if (diffDays === 2) return 'Ayer'
  if (diffDays <= 7) return `Hace ${diffDays - 1} días`
  if (diffDays <= 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  return fechaObj.toLocaleDateString('es-ES')
}
</script>