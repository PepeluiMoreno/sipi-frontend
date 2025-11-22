<template>
  <button
    @click="$emit('select', user)"
    class="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3 mb-2 transition-colors border"
    :class="{ 
      'bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-600': isSelected
    }"
  >
    <div class="flex-shrink-0">
      <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
        <UserIcon class="w-5 h-5 text-indigo-600" />
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-medium text-gray-900 truncate">{{ user.nombre }} {{ user.apellidos }}</h3>
      <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
      <div class="flex flex-wrap gap-1 mt-1">
        <span 
          v-for="role in user.roles" 
          :key="role.id"
          class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
          :class="getRoleBadgeClass(role.nombre)"
        >
          {{ role.nombre }}
        </span>
      </div>
    </div>
    <div class="flex-shrink-0">
      <CheckCircleIcon 
        v-if="user.email_verificado" 
        class="w-4 h-4 text-green-500" 
        title="Email verificado"
      />
    </div>
  </button>
</template>

<script setup>
import { UserIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  user: Object,
  isSelected: Boolean
})

defineEmits(['select'])

const getRoleBadgeClass = (roleName) => {
  const classes = {
    'Administrador': 'bg-red-100 text-red-800',
    'Editor': 'bg-blue-100 text-blue-800',
    'Consultor': 'bg-green-100 text-green-800',
    'Técnico': 'bg-purple-100 text-purple-800'
  }
  return classes[roleName] || 'bg-gray-100 text-gray-800'
}
</script>