<template>
  <div class="bg-white rounded-lg shadow flex flex-col flex-shrink-0 h-full">
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-gray-900">Roles del Sistema</h2>
        <button 
          @click="$emit('new-role')"
          class="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 flex items-center text-sm"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Nuevo Rol
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="role in roles"
        :key="role.id"
        class="p-3 rounded-lg border mb-2 hover:bg-gray-50 cursor-pointer transition-colors"
        :class="{ 'bg-indigo-50 border-indigo-200': isSelected(role) }"
        @click="$emit('select-role', role)"
      >
        <div class="flex justify-between items-start">
          <h3 class="font-medium text-gray-900 text-sm">{{ role.nombre }}</h3>
          <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {{ role.usuarios_count }} usuarios
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">{{ role.descripcion }}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-xs text-gray-400">
            Creado: {{ formatDate(role.created_at) }}
          </span>
          <button 
            @click.stop="$emit('edit-role', role)"
            class="text-gray-400 hover:text-indigo-600 p-1"
            title="Editar rol"
          >
            <PencilIcon class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, PencilIcon } from '@heroicons/vue/24/outline'

defineProps({
  roles: Array,
  selectedRole: Object
})

defineEmits(['select-role', 'new-role', 'edit-role'])

const isSelected = (role) => {
  return role.id === selectedRole?.id
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}
</script>