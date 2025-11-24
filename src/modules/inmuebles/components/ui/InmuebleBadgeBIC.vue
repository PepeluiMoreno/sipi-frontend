<!-- modules/inmuebles/components/ui/InmuebleBadgeBIC.vue -->
<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        :class="badgeClasses">
    <span class="w-1.5 h-1.5 rounded-full mr-1.5 bg-purple-500"></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'default', // 'default', 'outline'
    validator: (value) => ['default', 'outline'].includes(value)
  }
})

const label = computed(() => 'BIC')

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full font-medium'
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  const variants = {
    default: 'bg-purple-100 text-purple-800 border border-purple-200',
    outline: 'bg-white text-purple-700 border border-purple-300'
  }
  
  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>