<!-- src/modules/usuarios/views/ConfigUsuarios.vue -->
<template>
  <div class="h-full flex">
    <!-- Sidebar -->
    <UsuariosSidebar
      :users="usuarios"
      :roles="roles"
      :selected-item="selectedItem"
      :selected-type="selectedType"
      @select-user="onUserSelected"
      @select-role="onRoleSelected"
      @new-user="showNewUserForm"
      @new-role="showNewRoleForm"
    />

    <!-- Panel principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 bg-white">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios y Roles</h1>
            <p class="text-sm text-gray-600 mt-1">Administre los usuarios y permisos del sistema</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="showNewUserForm"
              class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center text-sm"
            >
              <PlusIcon class="w-4 h-4 mr-2" />
              Nuevo Usuario
            </button>
            <button
              @click="showNewRoleForm"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm"
            >
              <PlusIcon class="w-4 h-4 mr-2" />
              Nuevo Rol
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="usuariosLoading || rolesLoading" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando datos...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="usuariosError || rolesError" class="flex-1 flex items-center justify-center">
        <div class="text-center text-red-600">
          <ExclamationTriangleIcon class="w-12 h-12 mx-auto mb-4" />
          <p>Error al cargar los datos</p>
          <button 
            @click="cargarDatos"
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      </div>

      <!-- Contenido dinámico -->
      <div v-else class="flex-1 overflow-hidden">
        <!-- Vista de detalles de usuario -->
        <UsuarioDetalles
          v-if="selectedItem && selectedType === 'user'"
          :user="selectedItem"
          :available-roles="roles"
          @user-updated="onUserUpdated"
          @user-deleted="onUserDeleted"
          @edit-user="editUser"
          @cancel-selection="clearSelection"
        />

        <!-- Vista de detalles de rol -->
        <RoleDetalles
          v-else-if="selectedItem && selectedType === 'role'"
          :role="selectedItem"
          :users="usuarios"
          @role-updated="onRoleUpdated"
          @role-deleted="onRoleDeleted"
          @edit-role="editRole"
          @cancel-selection="clearSelection"
        />

        <!-- Vista vacía -->
        <div v-else class="h-full flex items-center justify-center text-gray-500">
          <div class="text-center">
            <UsersIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Seleccione un usuario o rol</h3>
            <p class="text-gray-600">Elija un elemento de la lista para ver sus detalles</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <UsuarioFormModal
      v-if="showUserForm"
      :user="editingUser"
      :is-editing="!!editingUser"
      @save="onUserSaved"
      @close="closeUserForm"
    />

    <RoleFormModal
      v-if="showRoleForm"
      :role="editingRole"
      :is-editing="!!editingRole"
      @save="onRoleSaved"
      @close="closeRoleForm"
    />

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="itemToDelete"
      :item-type="selectedType"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, UsersIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useUsuarios, useRoles } from '../composables'

// Importaciones de componentes - RUTAS CORREGIDAS
import UsuariosSidebar from '../components/UsuariosSidebar.vue'
import UsuarioDetalles from '../components/UsuarioDetalles.vue'
import RoleDetalles from '../components/RoleDetalles.vue'
import UsuarioFormModal from '../components/UsuarioFormModal.vue'
import RoleFormModal from '../components/RoleFormModal.vue'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue'

// Composables
const {
  usuarios,
  loading: usuariosLoading,
  error: usuariosError,
  listar: listarUsuarios,
  crear: crearUsuario,
  actualizar: actualizarUsuario,
  eliminar: eliminarUsuario
} = useUsuarios()

const {
  roles,
  loading: rolesLoading,
  error: rolesError,
  listar: listarRoles,
  crear: crearRol,
  actualizar: actualizarRol,
  eliminar: eliminarRol
} = useRoles()

// Estado local
const selectedItem = ref(null)
const selectedType = ref(null)
const showUserForm = ref(false)
const showRoleForm = ref(false)
const showDeleteModal = ref(false)
const editingUser = ref(null)
const editingRole = ref(null)
const itemToDelete = ref(null)

// Cargar datos iniciales
const cargarDatos = async () => {
  try {
    await Promise.all([
      listarUsuarios(),
      listarRoles()
    ])
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
}

onMounted(() => {
  cargarDatos()
})

// Handlers de selección
const onUserSelected = (user) => {
  selectedItem.value = user
  selectedType.value = 'user'
}

const onRoleSelected = (role) => {
  selectedItem.value = role
  selectedType.value = 'role'
}

const clearSelection = () => {
  selectedItem.value = null
  selectedType.value = null
}

// Handlers de formularios
const showNewUserForm = () => {
  editingUser.value = null
  showUserForm.value = true
}

const showNewRoleForm = () => {
  editingRole.value = null
  showRoleForm.value = true
}

const editUser = (user) => {
  editingUser.value = user
  showUserForm.value = true
}

const editRole = (role) => {
  editingRole.value = role
  showRoleForm.value = true
}

const closeUserForm = () => {
  showUserForm.value = false
  editingUser.value = null
}

const closeRoleForm = () => {
  showRoleForm.value = false
  editingRole.value = null
}

// Handlers de guardado
const onUserSaved = async (userData) => {
  try {
    if (editingUser.value) {
      await actualizarUsuario(editingUser.value.id, userData)
    } else {
      await crearUsuario(userData)
    }
    closeUserForm()
    await cargarDatos() // Recargar datos
  } catch (error) {
    console.error('Error guardando usuario:', error)
  }
}

const onRoleSaved = async (roleData) => {
  try {
    if (editingRole.value) {
      await actualizarRol(editingRole.value.id, roleData)
    } else {
      await crearRol(roleData)
    }
    closeRoleForm()
    await cargarDatos() // Recargar datos
  } catch (error) {
    console.error('Error guardando rol:', error)
  }
}

// Handlers de actualización
const onUserUpdated = async (updatedUser) => {
  try {
    await actualizarUsuario(updatedUser.id, updatedUser)
    await cargarDatos()
  } catch (error) {
    console.error('Error actualizando usuario:', error)
  }
}

const onRoleUpdated = async (updatedRole) => {
  try {
    await actualizarRol(updatedRole.id, updatedRole)
    await cargarDatos()
  } catch (error) {
    console.error('Error actualizando rol:', error)
  }
}

// Handlers de eliminación
const onUserDeleted = (user) => {
  itemToDelete.value = user
  showDeleteModal.value = true
}

const onRoleDeleted = (role) => {
  itemToDelete.value = role
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    if (selectedType.value === 'user') {
      await eliminarUsuario(itemToDelete.value.id)
    } else {
      await eliminarRol(itemToDelete.value.id)
    }
    clearSelection()
    await cargarDatos()
  } catch (error) {
    console.error('Error eliminando:', error)
  } finally {
    showDeleteModal.value = false
    itemToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}
</script>