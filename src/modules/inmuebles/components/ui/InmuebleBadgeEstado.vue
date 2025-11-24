<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        :class="badgeClasses">
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClasses"></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { ESTADOS_INMUEBLE } from '../../mocks'

const props = defineProps({
  estado: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const estadoConfig = computed(() => {
  return ESTADOS_INMUEBLE.find(e => e.label === props.estado) || 
         ESTADOS_INMUEBLE.find(e => e.key === props.estado) || 
         { label: props.estado, color: 'bg-gray-600' }
})

const label = computed(() => estadoConfig.value.label)

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  const color = estadoConfig.value.color.replace('bg-', 'bg-').replace('600', '100') + ' text-' + estadoConfig.value.color.replace('bg-', '').replace('600', '800')
  return `${base} ${sizes[props.size]} ${color}`
})

const dotClasses = computed(() => {
  return estadoConfig.value.color
})
</script>