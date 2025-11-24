<template>
  <aside 
    class="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-full z-40"
    :class="isCollapsed ? 'w-16' : 'w-80'"
  >
    <!-- Header del Sidebar -->
    <div class="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
      <div v-if="!isCollapsed" class="flex items-center space-x-3">
        <BuildingLibraryIcon class="w-6 h-6 text-indigo-600" />
        <div>
          <h2 class="font-semibold text-gray-900 text-sm">Filtros</h2>
          <p class="text-xs text-gray-500">Busque y filtre inmuebles</p>
        </div>
      </div>
      <button
        @click="$emit('toggle-sidebar')"
        class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        :title="isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'"
      >
        <ChevronDoubleLeftIcon 
          v-if="!isCollapsed" 
          class="w-4 h-4 text-gray-500" 
        />
        <ChevronDoubleRightIcon 
          v-else 
          class="w-4 h-4 text-gray-500" 
        />
      </button>
    </div>

    <!-- Contenido del Sidebar -->
    <div class="flex-1 overflow-y-auto p-4" v-if="!isCollapsed">
      <InmuebleFiltros 
        :filters="filters"
        @filters-change="$emit('filters-change', $event)"
      />
    </div>

    <!-- Sidebar Colapsado - Iconos -->
    <div v-else class="flex-1 overflow-y-auto py-4 space-y-2">
      <button
        v-for="action in sidebarActions"
        :key="action.name"
        @click="action.handler"
        class="w-full p-2 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        :title="action.title"
      >
        <component :is="action.icon" class="w-5 h-5" />
      </button>
    </div>

    <!-- Footer del Sidebar -->
    <div class="p-4 border-t border-gray-200 flex-shrink-0" v-if="!isCollapsed">
      <button
        @click="resetFilters"
        class="w-full btn btn-ghost btn-sm"
      >
        <ArrowPathIcon class="w-4 h-4 mr-2" />
        Restablecer Filtros
      </button>
    </div>
  </aside>
</template>

<script setup>
import { 
  BuildingLibraryIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  FunnelIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'
import InmuebleFiltros from '../filters/InmuebleFiltros.vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filters-change', 'toggle-sidebar'])

const sidebarActions = [
  {
    name: 'search',
    title: 'Buscar',
    icon: MagnifyingGlassIcon,
    handler: () => console.log('Buscar')
  },
  {
    name: 'filters',
    title: 'Filtros',
    icon: FunnelIcon,
    handler: () => emit('toggle-sidebar')
  },
  {
    name: 'map',
    title: 'Mapa',
    icon: MapPinIcon,
    handler: () => console.log('Mapa')
  },
  {
    name: 'settings',
    title: 'Configuración',
    icon: Cog6ToothIcon,
    handler: () => console.log('Configuración')
  }
]

const resetFilters = () => {
  emit('filters-change', { 
    busqueda: '',
    ccaa: null,
    provincia: null,
    localidad: null,
    estados: {},
    esBic: null,
    enVenta: null
  })
}
</script>

<style scoped>
/* Asegurar que el sidebar tenga la altura correcta */
.fixed.h-full {
  height: 100vh;
}
</style>