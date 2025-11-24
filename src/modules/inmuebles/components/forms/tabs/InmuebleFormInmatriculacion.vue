<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Inmatriculación</h3>
        <p class="text-sm text-gray-600 mt-1">Datos de registro en el Registro de la Propiedad</p>
      </div>
      <div class="flex items-center space-x-2">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="estaInmatriculado"
            @change="toggleInmatriculacion"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span class="text-sm font-medium text-gray-700">Inmatriculado</span>
        </label>
      </div>
    </div>

    <!-- Formulario de inmatriculación -->
    <div v-if="estaInmatriculado && inmatriculacionData" class="space-y-6">
      <!-- Fecha y Registro -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Fecha de inmatriculación
          </label>
          <input
            type="date"
            v-model="inmatriculacionData.fecha"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Registro de la Propiedad
          </label>
          <input
            v-model="inmatriculacionData.registro_propiedad_id"
            placeholder="Número de registro"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <!-- Tipo de certificación -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Tipo de certificación
        </label>
        <select
          v-model="inmatriculacionData.tipo_certificacion_propiedad_id"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Seleccione tipo de certificación</option>
          <option value="notarial">Certificación notarial</option>
          <option value="registral">Certificación registral</option>
          <option value="administrativa">Certificación administrativa</option>
          <option value="otro">Otro tipo</option>
        </select>
      </div>

      <!-- Número de finca -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Número de finca
        </label>
        <input
          v-model="inmatriculacionData.numero_finca"
          placeholder="Número de finca registral"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Tomo y Folio -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tomo
          </label>
          <input
            v-model="inmatriculacionData.tomo"
            placeholder="Tomo"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Folio
          </label>
          <input
            v-model="inmatriculacionData.folio"
            placeholder="Folio"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <!-- Observaciones -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          v-model="inmatriculacionData.observaciones"
          rows="4"
          placeholder="Observaciones adicionales sobre la inmatriculación..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Documentación -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Documentación</h4>
        <div class="space-y-3">
          <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              v-model="inmatriculacionData.tiene_escritura"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div>
              <span class="text-sm font-medium text-gray-900">Escritura notarial</span>
              <p class="text-xs text-gray-500">Documento notarial de propiedad</p>
            </div>
          </label>

          <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              v-model="inmatriculacionData.tiene_certificacion"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div>
              <span class="text-sm font-medium text-gray-900">Certificación registral</span>
              <p class="text-xs text-gray-500">Certificado del Registro de la Propiedad</p>
            </div>
          </label>

          <label class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              v-model="inmatriculacionData.tiene_planos"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div>
              <span class="text-sm font-medium text-gray-900">Planos catastrales</span>
              <p class="text-xs text-gray-500">Documentación gráfica del inmueble</p>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Estado no inmatriculado -->
    <div
      v-else
      class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
    >
      <DocumentIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h4 class="text-lg font-medium text-gray-900 mb-2">No inmatriculado</h4>
      <p class="text-gray-500 mb-4">Este inmueble no está registrado en el Registro de la Propiedad</p>
      <button
        @click="toggleInmatriculacion"
        class="btn btn-primary"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Añadir Inmatriculación
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { DocumentIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:property'])

const estaInmatriculado = ref(!!props.property.esta_inmatriculado)

const inmatriculacionData = ref(props.property.inmatriculacion || {
  fecha: '',
  registro_propiedad_id: '',
  tipo_certificacion_propiedad_id: '',
  numero_finca: '',
  tomo: '',
  folio: '',
  observaciones: '',
  tiene_escritura: false,
  tiene_certificacion: false,
  tiene_planos: false
})

watch(inmatriculacionData, (newData) => {
  emit('update:property', {
    ...props.property,
    inmatriculacion: newData,
    esta_inmatriculado: estaInmatriculado.value
  })
}, { deep: true })

const toggleInmatriculacion = () => {
  estaInmatriculado.value = !estaInmatriculado.value
  if (!estaInmatriculado.value) {
    inmatriculacionData.value = null
  } else {
    inmatriculacionData.value = {
      fecha: '',
      registro_propiedad_id: '',
      tipo_certificacion_propiedad_id: '',
      numero_finca: '',
      tomo: '',
      folio: '',
      observaciones: '',
      tiene_escritura: false,
      tiene_certificacion: false,
      tiene_planos: false
    }
  }
}
</script>