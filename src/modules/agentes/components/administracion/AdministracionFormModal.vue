<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEdit ? 'Editar Administración' : 'Nueva Administración' }}
        </h2>
        <button 
          @click="close"
          class="p-2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input 
              v-model="form.nombre"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Ámbito -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Ámbito *
            </label>
            <select 
              v-model="form.ambito"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="municipal">Municipal</option>
              <option value="provincial">Provincial</option>
              <option value="autonomico">Autonómico</option>
              <option value="estatal">Estatal</option>
            </select>
          </div>

          <!-- Nombre del responsable -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre del responsable *
            </label>
            <input 
              v-model="form.nombreResponsable"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Número Identificación -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Número ID *
            </label>
            <input 
              v-model="form.numeroIdentificacion"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input 
              v-model="form.telefono"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Dirección -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input 
              v-model="form.direccion"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Código Postal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Código Postal
            </label>
            <input 
              v-model="form.codigoPostal"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Localidad -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Localidad *
            </label>
            <select 
              v-model="form.localidadId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccione localidad</option>
              <option 
                v-for="localidad in localidades" 
                :key="localidad.id" 
                :value="localidad.id"
              >
                {{ localidad.nombre }}
              </option>
            </select>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button 
            type="button"
            @click="close"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ArrowPathIcon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEdit ? 'Guardar cambios' : 'Crear administración' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { 
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  administracion: {
    type: Object,
    default: null
  },
  localidades: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const isEdit = ref(false)
const form = ref({
  nombre: '',
  ambito: 'municipal',
  nombreResponsable: '',
  numeroIdentificacion: '',
  email: '',
  telefono: '',
  direccion: '',
  codigoPostal: '',
  localidadId: ''
})

watch(() => props.show, (newVal) => {
  if (newVal && props.administracion) {
    // Modo edición
    isEdit.value = true
    form.value = {
      nombre: props.administracion.nombre,
      ambito: props.administracion.ambito,
      nombreResponsable: props.administracion.nombreResponsable || '',
      numeroIdentificacion: props.administracion.numeroIdentificacion,
      email: props.administracion.email || '',
      telefono: props.administracion.telefono || '',
      direccion: props.administracion.direccion || '',
      codigoPostal: props.administracion.codigoPostal || '',
      localidadId: props.administracion.localidadId || ''
    }
  } else if (newVal) {
    // Modo creación
    isEdit.value = false
    form.value = {
      nombre: '',
      ambito: 'municipal',
      nombreResponsable: '',
      numeroIdentificacion: '',
      email: '',
      telefono: '',
      direccion: '',
      codigoPostal: '',
      localidadId: ''
    }
  }
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('save', { ...form.value, id: props.administracion?.id })
}
</script>