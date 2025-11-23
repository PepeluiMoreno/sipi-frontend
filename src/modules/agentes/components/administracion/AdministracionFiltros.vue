<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Búsqueda -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          <MagnifyingGlassIcon class="w-4 h-4 inline mr-1" />
          Búsqueda
        </label>
        <input 
          v-model="filters.search"
          @input="$emit('filter-change', filters)"
          type="text"
          placeholder="Nombre, NIF..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Localidad -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          <MapPinIcon class="w-4 h-4 inline mr-1" />
          Localidad
        </label>
        <select 
          v-model="filters.localidadId"
          @change="$emit('filter-change', filters)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Todas las localidades</option>
          <option 
            v-for="localidad in localidades" 
            :key="localidad.id" 
            :value="localidad.id"
          >
            {{ localidad.nombre }}
          </option>
        </select>
      </div>

      <!-- Ámbito -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          <GlobeAltIcon class="w-4 h-4 inline mr-1" />
          Ámbito
        </label>
        <select 
          v-model="filters.ambito"
          @change="$emit('filter-change', filters)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Todos los ámbitos</option>
          <option value="municipal">Municipal</option>
          <option value="provincial">Provincial</option>
          <option value="autonomico">Autonómico</option>
          <option value="estatal">Estatal</option>
        </select>
      </div>
    </div>

    <div class="mt-4 flex justify-end">
      <button 
        @click="resetFilters"
        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center"
      >
        <FunnelIcon class="w-4 h-4 mr-1" />
        Limpiar filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  FunnelIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  localidades: {
    type: Array,
    default: () => []
  }
})

const filters = ref({
  search: '',
  localidadId: '',
  ambito: ''
})

const resetFilters = () => {
  filters.value = {
    search: '',
    localidadId: '',
    ambito: ''
  }
  emit('filter-change', filters.value)
}

const emit = defineEmits(['filter-change'])
</script>