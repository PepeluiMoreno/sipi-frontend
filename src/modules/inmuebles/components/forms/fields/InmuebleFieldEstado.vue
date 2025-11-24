<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="inputClasses"
    >
      <option value="">Seleccione un estado</option>
      <option 
        v-for="estado in estados" 
        :key="estado.key" 
        :value="estado.key"
      >
        {{ estado.label }}
      </option>
    </select>

    <!-- Estado visual -->
    <div v-if="modelValue" class="flex items-center space-x-2 text-sm">
      <div 
        class="w-3 h-3 rounded-full"
        :class="getEstadoColor(modelValue)"
      ></div>
      <span class="text-gray-600">{{ getEstadoLabel(modelValue) }}</span>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ESTADOS_INMUEBLE } from '../../../mocks'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Estado'
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const estados = ESTADOS_INMUEBLE

const inputClasses = computed(() => {
  const base = 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
  const error = props.error ? 'border-red-300' : 'border-gray-300'
  return `${base} ${error}`
})

const getEstadoColor = (estadoKey) => {
  const estado = estados.find(e => e.key === estadoKey)
  return estado ? estado.color : 'bg-gray-400'
}

const getEstadoLabel = (estadoKey) => {
  const estado = estados.find(e => e.key === estadoKey)
  return estado ? estado.label : 'Desconocido'
}
</script>