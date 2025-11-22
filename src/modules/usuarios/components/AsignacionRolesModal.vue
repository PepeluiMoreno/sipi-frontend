<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">
          Gestionar Roles - {{ user.nombre }} {{ user.apellidos }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">Selecciona los roles para este usuario</p>
      </div>

      <!-- Lista de roles disponibles -->
      <div class="p-6">
        <div class="space-y-3">
          <div
            v-for="role in availableRoles"
            :key="role.id"
            class="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <input
              :id="`role-${role.id}`"
              v-model="selectedRoles"
              :value="role.id"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            >
            <label :for="`role-${role.id}`" class="ml-3 flex-1 cursor-pointer">
              <span class="block text-sm font-medium text-gray-900">{{ role.nombre }}</span>
              <span class="block text-xs text-gray-500">{{ role.descripcion }}</span>
            </label>
            <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {{ role.usuarios_count }} usuarios
            </span>
          </div>
        </div>

        <!-- Estado vacío -->
        <div v-if="availableRoles.length === 0" class="text-center py-8">
          <ShieldExclamationIcon class="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p class="text-gray-500">No hay roles disponibles</p>
        </div>
      </div>

      <!-- Botones -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="saveRoles"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ShieldExclamationIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  user: Object,
  availableRoles: Array
})

const emit = defineEmits(['roles-updated', 'close'])

const selectedRoles = ref([])

// Inicializar con los roles actuales del usuario
watch(() => props.user, (user) => {
  if (user) {
    selectedRoles.value = user.roles.map(role => role.id)
  }
}, { immediate: true })

const saveRoles = () => {
  const updatedUser = {
    ...props.user,
    roles: props.availableRoles.filter(role => selectedRoles.value.includes(role.id))
  }
  
  emit('roles-updated', updatedUser)
}
</script>