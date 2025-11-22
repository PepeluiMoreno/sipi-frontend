<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-white">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">{{ role.nombre }}</h2>
          <p class="text-sm text-gray-500">{{ role.descripcion }}</p>
        </div>
        <div class="flex space-x-2">
          <!-- Botón Cancelar para salir del modo edición -->
          <button 
            @click="cancelSelection"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center text-sm"
          >
            <XMarkIcon class="w-4 h-4 mr-1" />
            Cancelar
          </button>
          <button 
            @click="$emit('edit-role', role)"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center text-sm"
          >
            <PencilIcon class="w-4 h-4 mr-1" />
            Editar
          </button>
          <button 
            @click="$emit('role-deleted', role)"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center text-sm"
          >
            <TrashIcon class="w-4 h-4 mr-1" />
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Información del Rol -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="font-medium text-gray-900 mb-4 flex items-center">
            <ShieldCheckIcon class="w-5 h-5 mr-2 text-gray-600" />
            Información del Rol
          </h3>
          <dl class="space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Nombre del rol</dt>
              <dd class="text-sm text-gray-900">{{ role.nombre }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Descripción</dt>
              <dd class="text-sm text-gray-900">{{ role.descripcion || 'Sin descripción' }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Usuarios asignados</dt>
              <dd class="text-sm text-gray-900">{{ role.usuarios_count }} usuarios</dd>
            </div>
          </dl>
        </div>

        <!-- Usuarios con este Rol -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="font-medium text-gray-900 mb-4 flex items-center">
            <UsersIcon class="w-5 h-5 mr-2 text-gray-600" />
            Usuarios con este Rol
          </h3>
          
          <div v-if="usersWithRole.length > 0" class="space-y-2">
            <div
              v-for="user in usersWithRole"
              :key="user.id"
              class="flex items-center p-3 bg-white rounded-lg border"
            >
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <UserIcon class="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <div class="ml-3 flex-1">
                <h4 class="text-sm font-medium text-gray-900">{{ user.nombre }} {{ user.apellidos }}</h4>
                <p class="text-xs text-gray-500">{{ user.email }}</p>
                <div class="flex items-center mt-1">
                  <EnvelopeIcon class="w-3 h-3 text-gray-400 mr-1" />
                  <span class="text-xs text-gray-500">{{ user.nombre_usuario }}</span>
                </div>
              </div>
              <div class="flex-shrink-0">
                <CheckCircleIcon 
                  v-if="user.email_verificado" 
                  class="w-4 h-4 text-green-500" 
                  title="Email verificado"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-sm text-gray-500">No hay usuarios con este rol</p>
          </div>
        </div>

        <!-- Información del Sistema -->
        <div class="bg-gray-50 rounded-lg p-4 lg:col-span-2">
          <h3 class="font-medium text-gray-900 mb-4 flex items-center">
            <Cog6ToothIcon class="w-5 h-5 mr-2 text-gray-600" />
            Información del Sistema
          </h3>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">ID del rol</dt>
              <dd class="text-sm text-gray-900 font-mono">{{ role.id }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Fecha de creación</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(role.created_at) }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Última actualización</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(role.updated_at) }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  UsersIcon,
  UserIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  XMarkIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  role: Object,
  users: Array
})

const emit = defineEmits(['role-updated', 'role-deleted', 'edit-role', 'cancel-selection'])

const usersWithRole = computed(() => {
  return props.users.filter(user => 
    user.roles.some(role => role.id === props.role.id)
  )
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const cancelSelection = () => {
  emit('cancel-selection')
}
</script>