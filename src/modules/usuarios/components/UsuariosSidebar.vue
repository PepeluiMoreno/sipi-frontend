<template>
  <div class="w-80 bg-white rounded-lg shadow flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-gray-900">Usuarios y Roles</h2>
      </div>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar usuarios o roles..."
          class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
      </div>
    </div>

    <!-- Resto del componente permanece igual -->
    <!-- ... -->
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ShieldExclamationIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  users: Array,
  roles: Array,
  selectedItem: Object,
  selectedType: String
})

defineEmits(['select-user', 'select-role', 'new-user', 'new-role'])

const searchQuery = ref('')

// Método para limpiar la búsqueda (expuesto al padre)
const clearSearch = () => {
  searchQuery.value = ''
}

// Exponer el método al componente padre
defineExpose({
  clearSearch
})

// Computed properties y resto del código permanecen igual...
// ... (el resto del código del componente)
</script>