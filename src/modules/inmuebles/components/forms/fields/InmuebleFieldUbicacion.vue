<template>
  <div class="space-y-4">
    <!-- Comunidad Autónoma -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Comunidad Autónoma</label>
      <select 
        v-model="ccaaSeleccionada"
        @change="onCCAAChange"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione CCAA</option>
        <option v-for="ccaa in comunidades" :key="ccaa.id" :value="ccaa">
          {{ ccaa.nombre }}
        </option>
      </select>
    </div>

    <!-- Provincia -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
      <select 
        v-model="provinciaSeleccionada"
        @change="onProvinciaChange"
        :disabled="!ccaaSeleccionada"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        <option value="">Seleccione provincia</option>
        <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia">
          {{ provincia.nombre }}
        </option>
      </select>
    </div>

    <!-- Localidad -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Localidad</label>
      <select 
        v-model="localidadSeleccionada"
        @change="onLocalidadChange"
        :disabled="!provinciaSeleccionada"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      >
        <option value="">Seleccione localidad</option>
        <option v-for="localidad in localidadesFiltradas" :key="localidad.id" :value="localidad">
          {{ localidad.nombre }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  ccaa: Object,
  provincia: Object,
  localidad: Object
})

const emit = defineEmits(['change'])

// Datos mock
const comunidades = ref([
  { id: '1', nombre: 'Comunidad de Madrid' },
  { id: '2', nombre: 'Castilla y León' },
  { id: '3', nombre: 'Andalucía' }
])

const provincias = ref([
  { id: '1', nombre: 'Madrid', comunidadId: '1' },
  { id: '2', nombre: 'Ávila', comunidadId: '2' },
  { id: '3', nombre: 'Segovia', comunidadId: '2' },
  { id: '4', nombre: 'Sevilla', comunidadId: '3' }
])

const localidades = ref([
  { id: '1', nombre: 'Madrid', provinciaId: '1' },
  { id: '2', nombre: 'Alcalá de Henares', provinciaId: '1' },
  { id: '3', nombre: 'Ávila', provinciaId: '2' },
  { id: '4', nombre: 'Segovia', provinciaId: '3' },
  { id: '5', nombre: 'Sevilla', provinciaId: '4' }
])

// Estados locales
const ccaaSeleccionada = ref(props.ccaa)
const provinciaSeleccionada = ref(props.provincia)
const localidadSeleccionada = ref(props.localidad)

// Computed
const provinciasFiltradas = computed(() => {
  if (!ccaaSeleccionada.value) return []
  return provincias.value.filter(p => p.comunidadId === ccaaSeleccionada.value.id)
})

const localidadesFiltradas = computed(() => {
  if (!provinciaSeleccionada.value) return []
  return localidades.value.filter(l => l.provinciaId === provinciaSeleccionada.value.id)
})

// Métodos
const onCCAAChange = () => {
  provinciaSeleccionada.value = null
  localidadSeleccionada.value = null
  emitChange()
}

const onProvinciaChange = () => {
  localidadSeleccionada.value = null
  emitChange()
}

const onLocalidadChange = () => {
  emitChange()
}

const emitChange = () => {
  emit('change', {
    ccaa: ccaaSeleccionada.value,
    provincia: provinciaSeleccionada.value,
    localidad: localidadSeleccionada.value
  })
}

// Watchers para props externos
watch(() => props.ccaa, (newVal) => {
  ccaaSeleccionada.value = newVal
})

watch(() => props.provincia, (newVal) => {
  provinciaSeleccionada.value = newVal
})

watch(() => props.localidad, (newVal) => {
  localidadSeleccionada.value = newVal
})
</script>