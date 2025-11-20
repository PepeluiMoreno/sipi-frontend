<template>
  <div class="space-y-6">
    <!-- Dirección y datos principales -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input :value="property.direccion" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Localidad</label>
        <input :value="property.localidad" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
        <input :value="property.provincia" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Comunidad Autónoma</label>
        <input :value="property.comunidadAutonoma" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
    </div>

    <!-- ESTADOS (readonly como cadena) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Estados del Inmueble</label>
      <div class="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 font-medium min-h-[40px] flex items-center">
        {{ estadosActivos }}
      </div>
    </div>

    <!-- DENOMINACIONES ALTERNATIVAS -->
    <div v-if="tieneDenominacionesAlternativas">
      <label class="block text-sm font-medium text-gray-700 mb-2">Denominaciones Alternativas</label>
      <ul class="space-y-2 max-h-40 overflow-y-auto">
        <li 
          v-for="(denom, index) in property.denominacionesAlternativas" 
          :key="index"
          class="px-3 py-2 bg-gray-50 rounded text-sm text-gray-700 border-l-4 border-indigo-400"
        >
          {{ denom }}
        </li>
      </ul>
    </div>
    <div v-else>
      <label class="block text-sm font-medium text-gray-700 mb-1">Denominaciones Alternativas</label>
      <p class="text-sm text-gray-500 italic px-4 py-3 bg-gray-50 rounded-lg">No hay denominaciones alternativas registradas</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['property'])

const estadosActivos = computed(() => {
  const estados = []
  if (props.property.inmatriculado) estados.push('Inmatriculado')
  if (props.property.enVenta) estados.push('En venta')
  if (props.property.vendido) estados.push('Vendido')
  if (props.property.bic) estados.push('BIC')
  return estados.length > 0 ? estados.join(' - ') : 'Sin estados definidos'
})

const tieneDenominacionesAlternativas = computed(() => {
  return props.property.denominacionesAlternativas && 
         props.property.denominacionesAlternativas.length > 0
})
</script>