<template>
  <div class="text-center py-12 px-6">
    <div class="max-w-sm mx-auto">
      <!-- Icono -->
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
        <component :is="icon" class="h-8 w-8 text-gray-400" />
      </div>
      
      <!-- Texto -->
      <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-gray-500 mb-6">{{ description }}</p>

      <!-- Acciones -->
      <div v-if="hasFilters && showClearFilters" class="space-y-3">
        <button
          @click="$emit('clear-filters')"
          class="btn btn-primary w-full"
        >
          <FunnelIcon class="w-4 h-4 mr-2" />
          Limpiar filtros
        </button>
        <p class="text-xs text-gray-500">
          O ajuste los criterios de búsqueda
        </p>
      </div>

      <div v-else-if="showAction" class="space-y-3">
        <button
          @click="$emit('action')"
          class="btn btn-primary w-full"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          {{ actionText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BuildingLibraryIcon,
  MapPinIcon,
  FunnelIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

import {computed} from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'no-data', // 'no-data', 'no-results', 'error', 'no-selection'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  hasFilters: {
    type: Boolean,
    default: false
  },
  showClearFilters: {
    type: Boolean,
    default: true
  },
  showAction: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: 'Crear nuevo'
  }
})

const emit = defineEmits(['clear-filters', 'action'])

// Configuración según el tipo
const emptyStateConfig = computed(() => {
  const configs = {
    'no-data': {
      icon: BuildingLibraryIcon,
      title: 'No hay inmuebles',
      description: 'Comience añadiendo el primer inmueble al sistema.'
    },
    'no-results': {
      icon: FunnelIcon,
      title: 'No se encontraron resultados',
      description: 'Intente ajustar los filtros de búsqueda.'
    },
    'error': {
      icon: ExclamationTriangleIcon,
      title: 'Error al cargar los datos',
      description: 'Ha ocurrido un error al cargar los inmuebles.'
    },
    'no-selection': {
      icon: MapPinIcon,
      title: 'Ningún inmueble seleccionado',
      description: 'Seleccione un inmueble de la lista para ver sus detalles.'
    }
  }
  
  const config = configs[props.type] || configs['no-data']
  
  // Permitir override con props
  return {
    icon: config.icon,
    title: props.title || config.title,
    description: props.description || config.description
  }
})

const icon = computed(() => emptyStateConfig.value.icon)
const title = computed(() => emptyStateConfig.value.title)
const description = computed(() => emptyStateConfig.value.description)
</script>