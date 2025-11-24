<!-- modules/inmuebles/components/forms/InmuebleForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="inmueble-form">
    <!-- Header del formulario -->
    <div class="form-header" v-if="showHeader">
      <h2 class="form-title">{{ title }}</h2>
      <p class="form-description" v-if="description">{{ description }}</p>
    </div>

    <!-- Campos del formulario -->
    <div class="form-content">
      <slot>
        <!-- Slot por defecto para campos -->
        <div class="form-fields">
          <div v-for="field in defaultFields" :key="field.name" class="field-group">
            <component
              :is="getFieldComponent(field.type)"
              v-bind="field"
              :value="getFieldValue(field.name)"
              @update:value="handleFieldUpdate(field.name, $event)"
              @validate="handleFieldValidation(field.name, $event)"
            />
          </div>
        </div>
      </slot>
    </div>

    <!-- Mensajes de validación -->
    <div v-if="hasErrors" class="form-errors">
      <div class="error-message">
        <ExclamationTriangleIcon class="w-5 h-5" />
        <span>Por favor, corrige los errores en el formulario</span>
      </div>
      <ul class="error-list">
        <li v-for="(error, field) in validationErrors" :key="field">
          {{ error }}
        </li>
      </ul>
    </div>

    <!-- Footer del formulario -->
    <div class="form-footer" v-if="showActions">
      <div class="form-actions">
        <button
          type="button"
          @click="handleCancel"
          class="btn btn-outline"
          :disabled="loading"
        >
          <XMarkIcon class="w-4 h-4 mr-2" />
          Cancelar
        </button>
        
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading || !isDirty"
        >
          <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
          {{ submitText }}
        </button>
      </div>

      <!-- Información del estado -->
      <div class="form-info" v-if="lastSaved">
        <CheckCircleIcon class="w-4 h-4 text-green-500" />
        <span class="text-sm text-gray-600">
          Guardado el {{ formatDate(lastSaved) }}
        </span>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="form-loading">
      <SpinnerIcon size="md" />
      <span>Guardando cambios...</span>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

// Importar componentes de campos
import InmuebleFieldText from './fields/InmuebleFieldText.vue'
import InmuebleFieldEstado from './fields/InmuebleFieldEstado.vue'
import InmuebleFieldUbicacion from './fields/InmuebleFieldUbicacion.vue'
import InmuebleFieldImagen from './fields/InmuebleFieldImagen.vue'

// RUTA CORRECTA para SpinnerIcon desde forms/
import SpinnerIcon from '../ui/SpinnerIcon.vue'

const props = defineProps({
  // Configuración básica
  inmueble: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'create', // 'create', 'edit', 'view'
    validator: (value) => ['create', 'edit', 'view'].includes(value)
  },
  
  // Configuración de UI
  title: {
    type: String,
    default: 'Formulario de Inmueble'
  },
  description: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  
  // Estado
  loading: {
    type: Boolean,
    default: false
  },
  initialData: {
    type: Object,
    default: () => ({})
  },
  
  // Campos por defecto (si no se usa slot)
  fields: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'submit',
  'cancel',
  'update:inmueble',
  'change',
  'validate'
])

// Estado reactivo
const formData = ref({ ...props.initialData })
const validationErrors = ref({})
const isDirty = ref(false)
const lastSaved = ref(null)

// Computados
const submitText = computed(() => {
  const texts = {
    create: 'Crear Inmueble',
    edit: 'Guardar Cambios',
    view: 'Actualizar'
  }
  return texts[props.mode] || texts.edit
})

const hasErrors = computed(() => {
  return Object.keys(validationErrors.value).length > 0
})

const defaultFields = computed(() => {
  if (props.fields.length > 0) {
    return props.fields
  }
  
  // Campos por defecto si no se especifican
  return [
    {
      name: 'nombre',
      label: 'Nombre del Inmueble',
      type: 'text',
      required: true,
      placeholder: 'Ej: Iglesia de Santa María'
    },
    {
      name: 'estado',
      label: 'Estado',
      type: 'estado',
      required: true
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
      placeholder: 'Dirección completa'
    }
  ]
})

// Métodos
const getFieldComponent = (fieldType) => {
  const components = {
    text: InmuebleFieldText,
    estado: InmuebleFieldEstado,
    ubicacion: InmuebleFieldUbicacion,
    imagen: InmuebleFieldImagen
  }
  return components[fieldType] || InmuebleFieldText
}

const getFieldValue = (fieldName) => {
  return formData.value[fieldName] || props.inmueble[fieldName] || ''
}

const handleFieldUpdate = (fieldName, value) => {
  formData.value[fieldName] = value
  isDirty.value = true
  
  // Limpiar error de validación si existe
  if (validationErrors.value[fieldName]) {
    delete validationErrors.value[fieldName]
  }
  
  emit('change', fieldName, value)
  emit('update:inmueble', { ...props.inmueble, ...formData.value })
}

const handleFieldValidation = (fieldName, error) => {
  if (error) {
    validationErrors.value[fieldName] = error
  } else {
    delete validationErrors.value[fieldName]
  }
  
  emit('validate', validationErrors.value)
}

const handleSubmit = async () => {
  // Validación básica
  const errors = {}
  
  defaultFields.value.forEach(field => {
    if (field.required && !getFieldValue(field.name)) {
      errors[field.name] = `${field.label} es requerido`
    }
  })
  
  if (Object.keys(errors).length > 0) {
    validationErrors.value = errors
    emit('validate', errors)
    return
  }
  
  // Emitir evento de submit
  const submitData = {
    ...props.inmueble,
    ...formData.value
  }
  
  try {
    await emit('submit', submitData)
    lastSaved.value = new Date()
    isDirty.value = false
  } catch (error) {
    console.error('Error en el formulario:', error)
  }
}

const handleCancel = () => {
  emit('cancel')
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watchers
watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })

watch(() => props.inmueble, (newInmueble) => {
  // Actualizar formData cuando cambia el inmueble
  Object.keys(formData.value).forEach(key => {
    if (newInmueble[key] !== undefined) {
      formData.value[key] = newInmueble[key]
    }
  })
}, { deep: true })
</script>

<style scoped>
.inmueble-form {
  @apply space-y-6;
}

.form-header {
  @apply border-b border-gray-200 pb-6;
}

.form-title {
  @apply text-2xl font-bold text-gray-900;
}

.form-description {
  @apply text-gray-600 mt-2;
}

.form-content {
  @apply space-y-6;
}

.form-fields {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.field-group {
  @apply space-y-2;
}

.form-errors {
  @apply bg-red-50 border border-red-200 rounded-lg p-4;
}

.error-message {
  @apply flex items-center space-x-2 text-red-800 font-medium mb-2;
}

.error-list {
  @apply list-disc list-inside space-y-1 text-red-700 text-sm;
}

.form-footer {
  @apply border-t border-gray-200 pt-6 flex justify-between items-center;
}

.form-actions {
  @apply flex space-x-3;
}

.form-info {
  @apply flex items-center space-x-2;
}

.form-loading {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3 text-white z-50;
}

/* Estados del formulario */
.inmueble-form:not(.loading) .form-loading {
  @apply hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .form-fields {
    @apply grid-cols-1;
  }
  
  .form-footer {
    @apply flex-col space-y-4;
  }
  
  .form-actions {
    @apply w-full justify-between;
  }
}
</style>