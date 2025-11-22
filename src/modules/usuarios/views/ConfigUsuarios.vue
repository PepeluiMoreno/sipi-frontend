<template>
  <div class="h-[calc(100vh-8rem)] overflow-hidden">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios y Roles</h1>
        <p class="text-gray-600 mt-1">Administra usuarios, roles y permisos del sistema</p>
      </div>
    </div>
    
    <div class="flex h-full space-x-6">
      <!-- Sidebar izquierdo -->
      <UsuariosSidebar
        :users="users"
        :roles="roles"
        :selected-item="selectedItem"
        :selected-type="selectedType"
        @select-user="selectUser"
        @select-role="selectRole"
        @new-user="openUserForm"
        @new-role="openRoleForm"
        class="flex-shrink-0"
      />

      <!-- Panel principal derecho -->
      <div class="flex-1 bg-white rounded-lg shadow overflow-y-auto">
        <!-- Vista de usuario -->
        <UsuarioDetalles
          v-if="selectedType === 'user' && selectedItem"
          :user="selectedItem"
          :available-roles="roles"
          @user-updated="onUserUpdated"
          @user-deleted="onUserDeleted"
          @edit-user="openUserForm"
          @cancel-selection="cancelSelection"
          @resend-verification="onResendVerification"
        />

        <!-- Vista de rol -->
        <RoleDetalles
          v-else-if="selectedType === 'role' && selectedItem"
          :role="selectedItem"
          :users="users"
          @role-updated="onRoleUpdated"
          @role-deleted="onRoleDeleted"
          @edit-role="openRoleForm"
          @cancel-selection="cancelSelection"
        />

        <!-- Estado vacío -->
        <div v-else class="h-full flex items-center justify-center">
          <div class="text-center py-12 px-6">
            <UsersIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un elemento</h3>
            <p class="text-gray-500">Elige un usuario o rol de la lista para gestionarlo</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <UsuarioForm
      v-if="showUserForm"
      :user="editingUser"
      :is-editing="!!editingUser"
      @save="saveUser"
      @close="closeUserForm"
      @resend-verification="onResendVerification"
    />

    <RoleForm
      v-if="showRoleForm"
      :role="editingRole"
      :is-editing="!!editingRole"
      @save="saveRole"
      @close="closeRoleForm"
    />

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="itemToDelete"
      :item-type="deleteItemType"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UsersIcon } from '@heroicons/vue/24/outline'

import UsuariosSidebar from '../components/usuarios/UsuariosSidebar.vue'
import UsuarioForm from '../components/usuarios/UsuarioForm.vue'
import UsuarioDetalles from '../components/usuarios/UsuarioDetalles.vue'
import RoleForm from '../components/usuarios/RoleForm.vue'
import RoleDetalles from '../components/usuarios/RoleDetalles.vue'
import DeleteConfirmationModal from '../components/usuarios/DeleteConfirmationModal.vue'

const users = ref([])
const roles = ref([])
const selectedItem = ref(null)
const selectedType = ref(null)
const showUserForm = ref(false)
const showRoleForm = ref(false)
const showDeleteModal = ref(false)
const editingUser = ref(null)
const editingRole = ref(null)
const itemToDelete = ref(null)
const deleteItemType = ref(null)

const loadData = async () => {
  try {
    // TODO: Implementar queries Apollo/GraphQL
    /*
    // Cargar usuarios
    const { data: usersData } = await apolloClient.query({
      query: gql`
        query GetUsers {
          users {
            id
            nombre
            apellidos
            email
            nombre_usuario
            email_verificado
            roles {
              id
              nombre
            }
            telefono
            direccion
            created_at
            updated_at
            avatar
          }
        }
      `
    })
    users.value = usersData.users

    // Cargar roles
    const { data: rolesData } = await apolloClient.query({
      query: gql`
        query GetRoles {
          roles {
            id
            nombre
            descripcion
            usuarios_count
            created_at
            updated_at
          }
        }
      `
    })
    roles.value = rolesData.roles
    */
    
    // Mock temporal
    users.value = []
    roles.value = []
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
}

const selectUser = (user) => {
  selectedItem.value = user
  selectedType.value = 'user'
}

const selectRole = (role) => {
  selectedItem.value = role
  selectedType.value = 'role'
}

const cancelSelection = () => {
  selectedItem.value = null
  selectedType.value = null
}

const openUserForm = (user = null) => {
  editingUser.value = user
  showUserForm.value = true
}

const openRoleForm = (role = null) => {
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

const saveUser = async (userData) => {
  try {
    if (editingUser.value) {
      // TODO: Implementar mutación Apollo/GraphQL para actualizar usuario
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation UpdateUser($id: ID!, $input: UserInput!) {
            updateUser(id: $id, input: $input) {
              id
              nombre
              apellidos
              email
              nombre_usuario
              telefono
              direccion
              updated_at
            }
          }
        `,
        variables: {
          id: editingUser.value.id,
          input: userData
        }
      })
      const index = users.value.findIndex(u => u.id === editingUser.value.id)
      users.value[index] = data.updateUser
      */
      const index = users.value.findIndex(u => u.id === editingUser.value.id)
      users.value[index] = { 
        ...users.value[index], 
        ...userData,
        updated_at: new Date().toISOString()
      }
      selectedItem.value = users.value[index]
    } else {
      // TODO: Implementar mutación Apollo/GraphQL para crear usuario
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation CreateUser($input: UserInput!) {
            createUser(input: $input) {
              id
              nombre
              apellidos
              email
              nombre_usuario
              email_verificado
              roles {
                id
                nombre
              }
              telefono
              direccion
              created_at
              updated_at
              avatar
            }
          }
        `,
        variables: {
          input: userData
        }
      })
      users.value.push(data.createUser)
      selectedItem.value = data.createUser
      */
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        email_verificado: false,
        roles: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      users.value.push(newUser)
      selectedItem.value = newUser
    }
    selectedType.value = 'user'
    closeUserForm()
  } catch (error) {
    console.error('Error guardando usuario:', error)
  }
}

const saveRole = async (roleData) => {
  try {
    if (editingRole.value) {
      // TODO: Implementar mutación Apollo/GraphQL para actualizar rol
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation UpdateRole($id: ID!, $input: RoleInput!) {
            updateRole(id: $id, input: $input) {
              id
              nombre
              descripcion
              updated_at
            }
          }
        `,
        variables: {
          id: editingRole.value.id,
          input: roleData
        }
      })
      const index = roles.value.findIndex(r => r.id === editingRole.value.id)
      roles.value[index] = data.updateRole
      */
      const index = roles.value.findIndex(r => r.id === editingRole.value.id)
      roles.value[index] = { 
        ...roles.value[index], 
        ...roleData,
        updated_at: new Date().toISOString()
      }
      selectedItem.value = roles.value[index]
    } else {
      // TODO: Implementar mutación Apollo/GraphQL para crear rol
      /*
      const { data } = await apolloClient.mutate({
        mutation: gql`
          mutation CreateRole($input: RoleInput!) {
            createRole(input: $input) {
              id
              nombre
              descripcion
              usuarios_count
              created_at
              updated_at
            }
          }
        `,
        variables: {
          input: roleData
        }
      })
      roles.value.push(data.createRole)
      selectedItem.value = data.createRole
      */
      const newRole = {
        id: Date.now().toString(),
        ...roleData,
        usuarios_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      roles.value.push(newRole)
      selectedItem.value = newRole
    }
    selectedType.value = 'role'
    closeRoleForm()
  } catch (error) {
    console.error('Error guardando rol:', error)
  }
}

const onUserDeleted = (user) => {
  showDeleteModal.value = true
  itemToDelete.value = user
  deleteItemType.value = 'user'
}

const onRoleDeleted = (role) => {
  showDeleteModal.value = true
  itemToDelete.value = role
  deleteItemType.value = 'role'
}

const confirmDelete = async () => {
  try {
    if (deleteItemType.value === 'user') {
      // TODO: Implementar mutación Apollo/GraphQL para eliminar usuario
      /*
      await apolloClient.mutate({
        mutation: gql`
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id) {
              success
              message
            }
          }
        `,
        variables: {
          id: itemToDelete.value.id
        }
      })
      */
      users.value = users.value.filter(u => u.id !== itemToDelete.value.id)
    } else if (deleteItemType.value === 'role') {
      // TODO: Implementar mutación Apollo/GraphQL para eliminar rol
      /*
      await apolloClient.mutate({
        mutation: gql`
          mutation DeleteRole($id: ID!) {
            deleteRole(id: $id) {
              success
              message
            }
          }
        `,
        variables: {
          id: itemToDelete.value.id
        }
      })
      */
      roles.value = roles.value.filter(r => r.id !== itemToDelete.value.id)
    }
    
    if (selectedItem.value?.id === itemToDelete.value.id) {
      selectedItem.value = null
      selectedType.value = null
    }
  } catch (error) {
    console.error('Error eliminando:', error)
  } finally {
    showDeleteModal.value = false
    itemToDelete.value = null
    deleteItemType.value = null
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
  deleteItemType.value = null
}

const onUserUpdated = (updatedUser) => {
  const index = users.value.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    users.value[index] = updatedUser
    selectedItem.value = updatedUser
  }
}

const onRoleUpdated = (updatedRole) => {
  const index = roles.value.findIndex(r => r.id === updatedRole.id)
  if (index !== -1) {
    roles.value[index] = updatedRole
    selectedItem.value = updatedRole
  }
}

const onResendVerification = async (user) => {
  try {
    // TODO: Implementar mutación Apollo/GraphQL para reenviar verificación
    /*
    await apolloClient.mutate({
      mutation: gql`
        mutation ResendVerification($userId: ID!) {
          resendVerification(userId: $userId) {
            success
            message
          }
        }
      `,
      variables: {
        userId: user.id
      }
    })
    */
    console.log('Reenviando verificación para:', user.email)
  } catch (error) {
    console.error('Error reenviando verificación:', error)
  }
}

onMounted(loadData)
</script>