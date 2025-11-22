<template>
  <div class="space-y-4">
    <!-- Filtros geográficos en COLUMNA -->
    <div class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Comunidad Autónoma</label>
        <select v-model="selectedCCAA" @change="loadProvincias" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
          <option value="">Seleccione CCAA</option>
          <option v-for="ccaa in comunidades" :key="ccaa.id" :value="ccaa">{{ ccaa.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
        <select v-model="selectedProvincia" @change="loadLocalidades" :disabled="!selectedCCAA" class="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100">
          <option value="">Seleccione Provincia</option>
          <option v-for="prov in provincias" :key="prov.id" :value="prov">{{ prov.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Localidad</label>
        <select v-model="selectedLocalidad" @change="onLocationChange" :disabled="!selectedProvincia" class="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100">
          <option value="">Seleccione Localidad</option>
          <option v-for="loc in localidades" :key="loc.id" :value="loc">{{ loc.nombre }}</option>
        </select>
      </div>
    </div>

    <!-- Checkboxes de estados -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar estados</label>
      <div class="space-y-2">
        <label 
          v-for="estado in ESTADOS_INMUEBLE" 
          :key="estado.key"
          class="flex items-center cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
        >
          <input 
            type="checkbox" 
            v-model="filters[estado.key]" 
            class="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          >
          <span class="text-sm text-gray-700">{{ estado.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { ESTADOS_INMUEBLE } from '../../core/mocks'

const props = defineProps(['selectedLocation'])
const emit = defineEmits(['location-selected', 'filters-changed'])

const selectedCCAA = ref(null)
const selectedProvincia = ref(null)
const selectedLocalidad = ref(null)

const comunidades = ref([
  { id: '1', nombre: 'Madrid' },
  { id: '2', nombre: 'Cataluña' },
  { id: '3', nombre: 'Andalucía' },
  { id: '4', nombre: 'Canarias' }
])

const provincias = ref([])
const localidades = ref([])

// Inicializar filtros con todos los estados activos
const filters = ref({})
ESTADOS_INMUEBLE.forEach(estado => {
  filters.value[estado.key] = true
})

onMounted(() => {
  if (props.selectedLocation) {
    console.log('Ubicación inicial desde mapa:', props.selectedLocation)
  }
})

const loadProvincias = () => {
  if (!selectedCCAA.value) return
  const data = {
    '1': [{ id: '11', nombre: 'Madrid' }],
    '2': [{ id: '21', nombre: 'Barcelona' }],
    '3': [{ id: '31', nombre: 'Sevilla' }],
    '4': [{ id: '41', nombre: 'Santa Cruz de Tenerife' }]
  }
  provincias.value = data[selectedCCAA.value.id] || []
  localidades.value = []
  selectedProvincia.value = null
  selectedLocalidad.value = null
}

const loadLocalidades = () => {
  if (!selectedProvincia.value) return
  const data = {
    '11': [{ id: '111', nombre: 'Madrid' }],
    '21': [{ id: '211', nombre: 'Barcelona' }],
    '31': [{ id: '311', nombre: 'Sevilla' }],
    '41': [{ id: '411', nombre: 'Santa Cruz de Tenerife' }]
  }
  localidades.value = data[selectedProvincia.value.id] || []
  selectedLocalidad.value = null
}

const onLocationChange = () => {
  if (selectedLocalidad.value) {
    emit('location-selected', selectedLocalidad.value)
  }
}

watch(filters, () => emit('filters-changed', { ...filters.value }), { deep: true })
</script>