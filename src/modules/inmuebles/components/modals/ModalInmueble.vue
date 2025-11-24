<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl w-[90vw] h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            {{ isEditing ? 'Editar Inmueble' : 'Nuevo Inmueble' }}
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isEditing ? 'Modifique los datos del inmueble' : 'Complete la información del nuevo inmueble' }}
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            v-if="isEditing"
            @click="duplicarInmueble"
            class="btn btn-secondary btn-sm"
            :disabled="loading"
          >
            <DocumentDuplicateIcon class="w-4 h-4 mr-2" />
            Duplicar
          </button>
          <button
            @click="$emit('close')"
            class="btn btn-ghost btn-sm"
            :disabled="loading"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Contenido del formulario -->
      <div class="flex-1 overflow-hidden">
        <InmuebleForm
          :property="inmuebleData"
          :loading="loading"
          @save="onSave"
          @close="$emit('close')"
          class="h-full"
        />
      </div>

      <!-- Footer adicional -->
      <div class="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
        <div>
          <span v-if="inmuebleData.id">ID: {{ inmuebleData.id }}</span>
          <span v-else>Nuevo inmueble</span>
        </div>
        <div class="flex items-center space-x-4">
          <span v-if="inmuebleData.created_at">
            Creado: {{ formatFecha(inmuebleData.created_at) }}
          </span>
          <span v-if="inmuebleData.updated_at && isEditing">
            Actualizado: {{ formatFecha(inmuebleData.updated_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted ,onBeforeUnmount} from 'vue'
import { XMarkIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import InmuebleForm from '../forms/InmuebleForm.vue'

const props = defineProps({
  inmueble: {
    type: Object,
    default: () => ({
      nombre: '',
      denominacion_principal: '',
      direccion: '',
      direccion_normalizada: '',
      localidad: null,
      provincia: null,
      ccaa: null,
      lat: null,
      lng: null,
      estado: 'no_investigado',
      es_bic: false,
      es_ruina: false,
      esta_inmatriculado: false,
      enVenta: false,
      photo: '',
      actuaciones: [],
      transmisiones: [],
      inmatriculacion: null,
      osm_ext: null,
      wd_ext: null
    })
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'close'])

const inmuebleData = ref({ ...props.inmueble })

const isEditing = computed(() => {
  return !!inmuebleData.value.id
})

watch(() => props.inmueble, (newInmueble) => {
  inmuebleData.value = { ...newInmueble }
}, { deep: true })

const onSave = (inmuebleActualizado) => {
  emit('save', inmuebleActualizado)
}

const duplicarInmueble = () => {
  const inmuebleDuplicado = {
    ...inmuebleData.value,
    id: null,
    nombre: `${inmuebleData.value.nombre} (Copia)`,
    denominacion_principal: `${inmuebleData.value.denominacion_principal} (Copia)`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  emit('save', inmuebleDuplicado)
}

const formatFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Cerrar con ESC
const onKeydown = (event) => {
  if (event.key === 'Escape' && !props.loading) {
    emit('close')
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
  animation: scaleIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>