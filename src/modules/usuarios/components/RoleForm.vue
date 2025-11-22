<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ isEditing ? 'Editar Rol' : 'Crear Nuevo Rol' }}
        </h2>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="saveRole" class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre del rol *
          </label>
          <input
            v-model="formData.nombre"
            type="text"
            required
            maxlength="50"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ej: Administrador, Editor, Consultor..."
          >
          <p class="text-xs text-gray-500 mt-1">
            {{ formData.nombre.length }}/50 caracteres
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            v-model="formData.descripcion"
            rows="4"
            maxlength="200"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe las funciones y permisos de este rol..."
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            {{ formData.descripcion.length }}/200 caracteres
          </p>
        </div>

        <!-- Información del sistema (solo en edición) -->
        <div v-if="isEditing" class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Información del Sistema</h4>
          <dl class="text-xs text-gray-600 space-y-1">
            <div class="flex justify-between">
              <dt>ID del rol:</dt>
              <dd class="font-mono">{{ props.role?.id }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Creado:</dt>
              <dd>{{ formatDate(props.role?.created_at) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Actualizado:</dt>
              <dd>{{ formatDate(props.role?.updated_at) }}</dd>
            </div>
          </dl>
        </div>

        <!-- Mostrar errores de validación -->
        <div v-if="validationErrors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 class="text-sm font-medium text-red-800 mb-2">Errores de validación:</h4>
          <ul class="text-sm text-red-700 list-disc list-inside">
            <li v-for="error in validationErrors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            @click="closeForm"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {{ isEditing ? 'Actualizar' : 'Crear' }} Rol
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  role: Object,
  isEditing: Boolean
})

const emit = defineEmits(['save', 'close'])

const formData = ref({
  nombre: '',
  descripcion: ''
})

const validationErrors = ref([])

// Cargar datos del rol si estamos editando
watch(() => props.role, (role) => {
  if (role && props.isEditing) {
    formData.value = {
      nombre: role.nombre || '',
      descripcion: role.descripcion || ''
    }
  }
}, { immediate: true })

const validateForm = () => {
  validationErrors.value = []

  if (!formData.value.nombre.trim()) {
    validationErrors.value.push('El nombre del rol es obligatorio')
  }

  if (formData.value.nombre.length > 50) {
    validationErrors.value.push('El nombre del rol no puede exceder los 50 caracteres')
  }

  if (formData.value.descripcion.length > 200) {
    validationErrors.value.push('La descripción no puede exceder los 200 caracteres')
  }

  return validationErrors.value.length === 0
}

const saveRole = () => {
  if (!validateForm()) {
    return
  }

  emit('save', formData.value)
}

const closeForm = () => {
  emit('close')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>