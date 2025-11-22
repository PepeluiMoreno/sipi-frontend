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