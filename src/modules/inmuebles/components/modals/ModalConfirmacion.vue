<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-lg" :class="iconContainerClass">
            <component :is="icon" class="w-6 h-6" :class="iconClass" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Contenido -->
      <div class="p-6">
        <p class="text-gray-700">{{ message }}</p>
        
        <!-- Información adicional si existe -->
        <div v-if="item" class="mt-4 p-3 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-900">{{ item.nombre || item.denominacion_principal || 'Elemento seleccionado' }}</p>
          <p v-if="item.direccion" class="text-sm text-gray-600 mt-1">{{ item.direccion }}</p>
          <p v-if="item.localidad" class="text-xs text-gray-500 mt-1">{{ item.localidad.nombre }}</p>
        </div>

        <!-- Input de confirmación para acciones destructivas -->
        <div v-if="requiresConfirmation" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Escribe "{{ confirmationText }}" para confirmar:
          </label>
          <input
            v-model="confirmationInput"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder='Escribe "eliminar" para confirmar'
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          @click="$emit('cancel')"
          class="btn btn-ghost"
        >
          Cancelar
        </button>
        <button
          @click="onConfirm"
          :disabled="!canConfirm"
          class="btn"
          :class="confirmButtonClass"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  TrashIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  type: {
    type: String,
    default: 'warning', // 'warning', 'danger', 'info', 'success'
    validator: (value) => ['warning', 'danger', 'info', 'success'].includes(value)
  },
  title: {
    type: String,
    default: 'Confirmar acción'
  },
  subtitle: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  item: {
    type: Object,
    default: null
  },
  confirmButtonText: {
    type: String,
    default: 'Confirmar'
  },
  requiresConfirmation: {
    type: Boolean,
    default: false
  },
  confirmationText: {
    type: String,
    default: 'eliminar'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmationInput = ref('')

// Configuración según el tipo de modal
const modalConfig = computed(() => {
  const configs = {
    warning: {
      icon: ExclamationTriangleIcon,
      iconContainerClass: 'bg-yellow-50',
      iconClass: 'text-yellow-600',
      buttonClass: 'btn-warning'
    },
    danger: {
      icon: TrashIcon,
      iconContainerClass: 'bg-red-50',
      iconClass: 'text-red-600',
      buttonClass: 'btn-danger'
    },
    info: {
      icon: InformationCircleIcon,
      iconContainerClass: 'bg-blue-50',
      iconClass: 'text-blue-600',
      buttonClass: 'btn-primary'
    },
    success: {
      icon: CheckCircleIcon,
      iconContainerClass: 'bg-green-50',
      iconClass: 'text-green-600',
      buttonClass: 'btn-success'
    }
  }
  return configs[props.type] || configs.warning
})

const icon = computed(() => modalConfig.value.icon)
const iconContainerClass = computed(() => modalConfig.value.iconContainerClass)
const iconClass = computed(() => modalConfig.value.iconClass)
const confirmButtonClass = computed(() => modalConfig.value.buttonClass)

const canConfirm = computed(() => {
  if (props.requiresConfirmation) {
    return confirmationInput.value.toLowerCase() === props.confirmationText.toLowerCase()
  }
  return true
})

const onConfirm = () => {
  if (canConfirm.value) {
    emit('confirm', props.item)
  }
}

// Cerrar con ESC
const onKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('cancel')
  }
}

// Manejar eventos de teclado
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* Animaciones */
:deep(.fixed) {
  animation: fadeIn 0.2s ease-out;
}

:deep(.bg-white) {
  animation: slideUp 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>