<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-white">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">{{ user.nombre }} {{ user.apellidos }}</h2>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
        <div class="flex space-x-2">
          <button 
            @click="$emit('edit-user', user)"
            class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center text-sm"
          >
            <PencilIcon class="w-4 h-4 mr-1" />
            Editar
          </button>
          <button 
            @click="$emit('user-deleted', user)"
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
        <!-- Información Personal -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="font-medium text-gray-900 mb-4 flex items-center">
            <UserCircleIcon class="w-5 h-5 mr-2 text-gray-600" />
            Información Personal
          </h3>
          <dl class="space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Nombre de usuario</dt>
              <dd class="text-sm text-gray-900">{{ user.nombre_usuario }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Email verificado</dt>
              <dd class="text-sm">
                <span :class="user.email_verificado ? 'text-green-600' : 'text-red-600'">
                  {{ user.email_verificado ? 'Sí' : 'No' }}
                </span>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Teléfono</dt>
              <dd class="text-sm text-gray-900">{{ user.telefono || 'No especificado' }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Dirección</dt>
              <dd class="text-sm text-gray-900">{{ user.direccion || 'No especificada' }}</dd>
            </div>
          </dl>
        </div>

        <!-- Roles y Permisos -->
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-medium text-gray-900 flex items-center">
              <ShieldCheckIcon class="w-5 h-5 mr-2 text-gray-600" />
              Roles Asignados
            </h3>
            <button 
              @click="showRoleAssignment = true"
              class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Gestionar roles
            </button>
          </div>
          
          <div v-if="user.roles.length > 0" class="space-y-2">
            <div
              v-for="role in user.roles"
              :key="role.id"
              class="flex justify-between items-center p-3 bg-white rounded-lg border"
            >
              <div>
                <h4 class="font-medium text-gray-900 text-sm">{{ role.nombre }}</h4>
                <p class="text-xs text-gray-500">{{ getRoleDescription(role.id) }}</p>
              </div>
              <button 
                @click="removeRole(role)"
                class="text-red-600 hover:text-red-700 p-1"
                title="Quitar rol"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-sm text-gray-500">No hay roles asignados</p>
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
              <dt class="text-sm font-medium text-gray-500">ID de usuario</dt>
              <dd class="text-sm text-gray-900 font-mono">{{ user.id }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Fecha de creación</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(user.created_at) }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Última actualización</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(user.updated_at) }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Estado</dt>
              <dd class="text-sm">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Modal de asignación de roles -->
    <AsignacionRolesModal 
      v-if="showRoleAssignment"
      :user="user"
      :available-roles="availableRoles"
      @roles-updated="onRolesUpdated"
      @close="showRoleAssignment = false"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import {
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import AsignacionRolesModal from './AsignacionRolesModal.vue'

const props = defineProps({
  user: Object,
  availableRoles: Array
})

const emit = defineEmits(['user-updated', 'user-deleted', 'edit-user'])

const showRoleAssignment = ref(false)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getRoleDescription = (roleId) => {
  const role = props.availableRoles.find(r => r.id === roleId)
  return role?.descripcion || 'Sin descripción'
}

const removeRole = async (role) => {
  const updatedUser = {
    ...props.user,
    roles: props.user.roles.filter(r => r.id !== role.id)
  }
  emit('user-updated', updatedUser)
}

const onRolesUpdated = (updatedUser) => {
  emit('user-updated', updatedUser)
  showRoleAssignment.value = false
}
</script>