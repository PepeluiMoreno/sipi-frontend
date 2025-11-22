<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
        </h2>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="saveUser" class="p-6 space-y-6">
        <div class="flex justify-between items-start">
          <!-- Campos del formulario -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Información básica -->
            <div class="space-y-4">
              <h3 class="font-medium text-gray-900">Información Básica</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  v-model="formData.nombre"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ej: Ana"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos *
                </label>
                <input
                  v-model="formData.apellidos"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ej: García López"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario *
                </label>
                <input
                  v-model="formData.nombre_usuario"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ej: anagarcia"
                >
              </div>
            </div>

            <!-- Contacto y seguridad -->
            <div class="space-y-4">
              <h3 class="font-medium text-gray-900">Contacto y Seguridad</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div class="relative">
                  <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                    placeholder="Ej: ana.garcia@ejemplo.com"
                  >
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircleIcon 
                      v-if="formData.email_verificado" 
                      class="w-5 h-5 text-green-600" 
                      title="Email verificado"
                    />
                    <ExclamationCircleIcon 
                      v-else 
                      class="w-5 h-5 text-gray-400" 
                      title="Email pendiente de verificación"
                    />
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  <span :class="formData.email_verificado ? 'text-green-600 font-medium' : 'text-gray-500'">
                    {{ formData.email_verificado ? '✓ Email verificado' : '✗ Email pendiente de verificación' }}
                  </span>
                </p>
              </div>

              <div v-if="!isEditing">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña *
                </label>
                <input
                  v-model="formData.contrasena"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Mínimo 6 caracteres"
                >
              </div>

              <div v-if="!isEditing">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña *
                </label>
                <input
                  v-model="formData.confirmar_contrasena"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Repite la contraseña"
                >
              </div>
            </div>
          </div>

          <!-- Foto de perfil a la derecha -->
          <div class="ml-6 flex flex-col items-center">
            <div class="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
              <CameraIcon class="w-8 h-8 text-white" />
            </div>
            <button 
              type="button"
              @click="openPhotoUpload"
              class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Cambiar foto
            </button>
          </div>
        </div>

        <!-- Información de contacto -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              v-model="formData.telefono"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej: +34 612 345 678"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              v-model="formData.direccion"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej: Calle Principal 123, Madrid"
            >
          </div>
        </div>

        <!-- Botón para reenviar verificación (solo si no está verificado y estamos editando) -->
        <div v-if="isEditing && !formData.email_verificado" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-blue-800">Verificación pendiente</h4>
              <p class="text-sm text-blue-600 mt-1">El usuario no ha verificado su email</p>
            </div>
            <button
              type="button"
              @click="reenviarVerificacion"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Reenviar verificación
            </button>
          </div>
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
            {{ isEditing ? 'Actualizar' : 'Crear' }} Usuario
          </button>
        </div>
      </form>
    </div>

    <!-- Modal de carga de foto -->
    <PhotoUploadModal
      v-if="showPhotoUpload"
      :user="formData"
      @photo-updated="onPhotoUpdated"
      @close="showPhotoUpload = false"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CameraIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import PhotoUploadModal from './PhotoUploadModal.vue'

const props = defineProps({
  user: Object,
  isEditing: Boolean
})

const emit = defineEmits(['save', 'close', 'resend-verification'])

const formData = ref({
  nombre: '',
  apellidos: '',
  nombre_usuario: '',
  email: '',
  contrasena: '',
  confirmar_contrasena: '',
  telefono: '',
  direccion: '',
  email_verificado: false,
  avatar: ''
})

const validationErrors = ref([])
const showPhotoUpload = ref(false)

// Cargar datos del usuario si estamos editando
watch(() => props.user, (user) => {
  if (user && props.isEditing) {
    formData.value = {
      nombre: user.nombre || '',
      apellidos: user.apellidos || '',
      nombre_usuario: user.nombre_usuario || '',
      email: user.email || '',
      contrasena: '',
      confirmar_contrasena: '',
      telefono: user.telefono || '',
      direccion: user.direccion || '',
      email_verificado: user.email_verificado || false,
      avatar: user.avatar || ''
    }
  }
}, { immediate: true })

const reenviarVerificacion = () => {
  emit('resend-verification', formData.value)
}

const validateForm = () => {
  validationErrors.value = []

  if (!props.isEditing) {
    if (formData.value.contrasena.length < 6) {
      validationErrors.value.push('La contraseña debe tener al menos 6 caracteres')
    }
    
    if (formData.value.contrasena !== formData.value.confirmar_contrasena) {
      validationErrors.value.push('Las contraseñas no coinciden')
    }
  }

  if (!formData.value.nombre.trim()) {
    validationErrors.value.push('El nombre es obligatorio')
  }

  if (!formData.value.apellidos.trim()) {
    validationErrors.value.push('Los apellidos son obligatorios')
  }

  if (!formData.value.nombre_usuario.trim()) {
    validationErrors.value.push('El nombre de usuario es obligatorio')
  }

  if (!formData.value.email.trim()) {
    validationErrors.value.push('El email es obligatorio')
  } else if (!isValidEmail(formData.value.email)) {
    validationErrors.value.push('El formato del email no es válido')
  }

  return validationErrors.value.length === 0
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const openPhotoUpload = () => {
  showPhotoUpload.value = true
}

const onPhotoUpdated = (userWithPhoto) => {
  formData.value.avatar = userWithPhoto.avatar
  showPhotoUpload.value = false
}

const saveUser = () => {
  if (!validateForm()) {
    return
  }

  // Preparar datos para enviar
  const userData = { ...formData.value }
  
  // No enviar campos de confirmación si estamos editando
  if (props.isEditing) {
    delete userData.contrasena
    delete userData.confirmar_contrasena
  }

  emit('save', userData)
}

const closeForm = () => {
  emit('close')
}
</script>