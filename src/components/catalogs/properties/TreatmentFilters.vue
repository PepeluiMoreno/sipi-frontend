<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros de Ubicación</h3>
    
    <div class="space-y-4">
      <!-- Comunidad Autónoma -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Comunidad Autónoma
        </label>
        <select 
          v-model="selectedCCAA"
          @change="loadProvincias"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Seleccione CCAA</option>
          <option 
            v-for="ccaa in comunidades" 
            :key="ccaa.id" 
            :value="ccaa"
          >
            {{ ccaa.nombre }}
          </option>
        </select>
      </div>

      <!-- Provincia -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Provincia
        </label>
        <select 
          v-model="selectedProvincia"
          @change="loadLocalidades"
          :disabled="!selectedCCAA"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Seleccione Provincia</option>
          <option 
            v-for="prov in provincias" 
            :key="prov.id" 
            :value="prov"
          >
            {{ prov.nombre }}
          </option>
        </select>
      </div>

      <!-- Localidad -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Localidad
        </label>
        <select 
          v-model="selectedLocalidad"
          @change="saveSelection"
          :disabled="!selectedProvincia"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Seleccione Localidad</option>
          <option 
            v-for="loc in localidades" 
            :key="loc.id" 
            :value="loc"
          >
            {{ loc.nombre }}
          </option>
        </select>
      </div>

      <!-- Info de selección -->
      <div v-if="selectedLocalidad" class="p-3 bg-green-50 rounded-lg border border-green-200">
        <div class="flex items-center space-x-2">
          <CheckCircleIcon class="w-5 h-5 text-green-600" />
          <div class="text-sm">
            <strong>{{ selectedLocalidad.nombre }}</strong> seleccionada
          </div>
        </div>
      </div>

      <!-- Botón Añadir Inmueble (solo si hay localidad) -->
      <button 
        v-if="selectedLocalidad"
        @click="$emit('add-property-click')"
        class="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Añadir Inmueble en {{ selectedLocalidad.nombre }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CheckCircleIcon, PlusIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['location-selected', 'add-property-click'])

const selectedCCAA = ref(null)
const selectedProvincia = ref(null)
const selectedLocalidad = ref(null)

const comunidades = ref([])
const provincias = ref([])
const localidades = ref([])

// Mock data - reemplazar con llamadas a API
onMounted(() => {
  comunidades.value = [
    { id: '1', nombre: 'Madrid' },
    { id: '2', nombre: 'Cataluña' },
    { id: '3', nombre: 'Andalucía' },
    { id: '4', nombre: 'Comunidad Valenciana' }
  ]
})

const loadProvincias = () => {
  if (!selectedCCAA.value) return
  
  // Mock data
  const provinciasByCCAA = {
    '1': [{ id: '11', nombre: 'Madrid' }, { id: '12', nombre: 'Segovia' }],
    '2': [{ id: '21', nombre: 'Barcelona' }, { id: '22', nombre: 'Girona' }],
    '3': [{ id: '31', nombre: 'Sevilla' }, { id: '32', nombre: 'Granada' }],
    '4': [{ id: '41', nombre: 'Valencia' }, { id: '42', nombre: 'Alicante' }]
  }
  
  provincias.value = provinciasByCCAA[selectedCCAA.value.id] || []
  localidades.value = []
  selectedProvincia.value = null
  selectedLocalidad.value = null
}

const loadLocalidades = () => {
  if (!selectedProvincia.value) return
  
  // Mock data
  const localidadesByProv = {
    '11': [{ id: '111', nombre: 'Madrid' }, { id: '112', nombre: 'Getafe' }, { id: '113', nombre: 'Alcorcón' }],
    '21': [{ id: '211', nombre: 'Barcelona' }, { id: '212', nombre: 'Badalona' }, { id: '213', nombre: 'Hospitalet' }],
    '31': [{ id: '311', nombre: 'Sevilla' }, { id: '312', nombre: 'Dos Hermanas' }],
    '41': [{ id: '411', nombre: 'Valencia' }, { id: '412', nombre: 'Torrent' }]
  }
  
  localidades.value = localidadesByProv[selectedProvincia.value.id] || []
  selectedLocalidad.value = null
}

const saveSelection = () => {
  if (selectedLocalidad.value) {
    emit('location-selected', {
      id: selectedLocalidad.value.id,
      nombre: selectedLocalidad.value.nombre,
      provincia: selectedProvincia.value?.nombre,
      ccaa: selectedCCAA.value?.nombre
    })
  }
}
</script>