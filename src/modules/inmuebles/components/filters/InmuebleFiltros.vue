<template>
  <div class="filtros-container">
    <!-- Búsqueda textual -->
    <div class="filtro-group">
      <label class="filtro-label">Buscar inmuebles</label>
      <input 
        type="text" 
        class="filtro-input"
        placeholder="Nombre o dirección..."
        :value="filters.search"
        @input="handleFilterChange('search', $event.target.value)"
      />
    </div>

    <!-- Filtros geográficos usando datos mock COMPLETOS -->
    <div class="filtro-group">
      <label class="filtro-label">Provincia</label>
      <select 
        class="filtro-select"
        :value="filters.provincia"
        @change="handleFilterChange('provincia', $event.target.value)"
      >
        <option value="">Todas las provincias</option>
        <option v-for="provincia in todasLasProvincias" :key="provincia" :value="provincia">
          {{ provincia }}
        </option>
      </select>
    </div>

    <div class="filtro-group">
      <label class="filtro-label">Localidad</label>
      <select 
        class="filtro-select"
        :value="filters.localidad"
        @change="handleFilterChange('localidad', $event.target.value)"
      >
        <option value="">Todas las localidades</option>
        <option v-for="localidad in todasLasLocalidades" :key="localidad" :value="localidad">
          {{ localidad }}
        </option>
      </select>
    </div>

    <!-- Filtro por estados usando ESTADOS_INMUEBLE del mock -->
    <div class="filtro-group">
      <label class="filtro-label">Estados</label>
      <div class="estados-list">
        <div v-for="estado in estadosDisponibles" :key="estado.key" class="estado-item">
          <input
            type="checkbox"
            :id="`estado-${estado.key}`"
            :checked="filters.estados[estado.key] || false"
            @change="handleEstadoChange(estado.key, $event.target.checked)"
            class="estado-checkbox"
          />
          <label :for="`estado-${estado.key}`" class="estado-label">
            {{ estado.label }}
          </label>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="filtro-actions">
      <button 
        @click="handleAplicarFiltros" 
        class="btn-aplicar"
        :disabled="loading"
      >
        <span v-if="loading">Aplicando...</span>
        <span v-else>Aplicar Filtros</span>
      </button>
      
      <button 
        @click="handleLimpiarFiltros" 
        class="btn-limpiar"
        :disabled="loading"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue'
import { mockInmuebles, ESTADOS_INMUEBLE } from '../../../core/mocks'

const props = defineProps({
  filters: {
    type: Object,
    required: true,
    default: () => ({
      search: '',
      provincia: null,
      localidad: null,
      estados: {}
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filters-change', 'apply-filters'])

// Usar los estados definidos en el mock
const estadosDisponibles = ESTADOS_INMUEBLE

// Extraer TODAS las provincias y localidades del dataset COMPLETO
// Usando ref para que no sean reactivas a los filtros actuales
const todasLasProvincias = ref([])
const todasLasLocalidades = ref([])

// Inicializar con todos los datos disponibles
onMounted(() => {
  // Provincias únicas de todo el dataset
  const provincias = [...new Set(mockInmuebles.map(inmueble => inmueble.provincia))]
  todasLasProvincias.value = provincias.sort()
  
  // Localidades únicas de todo el dataset  
  const localidades = [...new Set(mockInmuebles.map(inmueble => inmueble.localidad))]
  todasLasLocalidades.value = localidades.sort()
  
  console.log('📍 Provincias disponibles:', todasLasProvincias.value)
  console.log('🏘️ Localidades disponibles:', todasLasLocalidades.value)
})

const handleFilterChange = (key, value) => {
  const nuevosFiltros = { 
    ...props.filters,
    [key]: value || null
  }
  
  // Si cambia la provincia, limpiar la localidad seleccionada
  if (key === 'provincia' && value !== props.filters.provincia) {
    nuevosFiltros.localidad = null
  }
  
  emit('filters-change', nuevosFiltros)
}

const handleEstadoChange = (estadoKey, checked) => {
  const nuevosEstados = {
    ...props.filters.estados,
    [estadoKey]: checked
  }
  const nuevosFiltros = {
    ...props.filters,
    estados: nuevosEstados
  }
  emit('filters-change', nuevosFiltros)
}

const handleAplicarFiltros = () => {
  emit('apply-filters')
}

const handleLimpiarFiltros = () => {
  const filtrosLimpiados = {
    search: '',
    provincia: null,
    localidad: null,
    estados: {}
  }
  emit('filters-change', filtrosLimpiados)
  // No aplicar automáticamente, dejar que el usuario decida
}
</script>

<style scoped>
.filtros-container {
  padding: 1.5rem;
  background: white;
  border-right: 1px solid #e5e7eb;
  height: 100%;
  overflow-y: auto;
}

.filtro-group {
  margin-bottom: 1.5rem;
}

.filtro-label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.filtro-input,
.filtro-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
}

.filtro-input:focus,
.filtro-select:focus {
  outline: none;
  border-color: #3b82f6;
  ring: 2px solid #3b82f6;
}

.estados-list {
  space-y: 0.5rem;
}

.estado-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.estado-checkbox {
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}

.estado-label {
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.filtro-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
}

.btn-aplicar {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-aplicar:hover:not(:disabled) {
  background: #2563eb;
}

.btn-aplicar:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-limpiar {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-limpiar:hover:not(:disabled) {
  background: #4b5563;
}
</style>