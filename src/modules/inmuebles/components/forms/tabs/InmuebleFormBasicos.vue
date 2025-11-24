<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900">Datos Básicos</h3>
      <p class="text-sm text-gray-600 mt-1">Información fundamental del inmueble</p>
    </div>

    <!-- Nombre y Tipo -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InmuebleFieldText
        v-model="formData.nombre"
        label="Nombre del inmueble"
        placeholder="Ej: Iglesia de San Pedro"
        :error="errors.nombre"
        required
      />

      <InmuebleFieldText
        v-model="formData.tipo_inmueble_id"
        label="Tipo de inmueble"
        placeholder="Seleccione tipo"
        :error="errors.tipo_inmueble_id"
      />
    </div>

    <!-- Denominación Principal -->
    <InmuebleFieldText
      v-model="formData.denominacion_principal"
      label="Denominación Principal"
      placeholder="Nombre oficial del inmueble"
      :error="errors.denominacion_principal"
    />

    <!-- Ubicación -->
    <div class="border-t pt-6">
      <h4 class="text-md font-medium text-gray-900 mb-4">Ubicación</h4>
      
      <InmuebleFieldText
        v-model="formData.direccion_normalizada"
        label="Dirección"
        placeholder="Calle, número, código postal..."
        :error="errors.direccion_normalizada"
        class="mb-4"
      />

      <InmuebleFieldUbicacion
        :ccaa="formData.ccaa"
        :provincia="formData.provincia"
        :localidad="formData.localidad"
        @change="onUbicacionChange"
      />
    </div>

    <!-- Coordenadas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t pt-6">
      <InmuebleFieldText
        v-model="formData.lat"
        label="Latitud"
        placeholder="40.4168"
        type="number"
        step="any"
        :error="errors.lat"
      />

      <InmuebleFieldText
        v-model="formData.lng"
        label="Longitud"
        placeholder="-3.7038"
        type="number"
        step="any"
        :error="errors.lng"
      />
    </div>

    <!-- Estados Booleanos -->
    <div class="border-t pt-6">
      <h4 class="text-md font-medium text-gray-900 mb-4">Estados y Clasificaciones</h4>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            v-model="formData.es_bic"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <span class="text-sm font-medium text-gray-900">BIC</span>
            <p class="text-xs text-gray-500">Bien de Interés Cultural</p>
          </div>
        </label>

        <label class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            v-model="formData.es_ruina"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <span class="text-sm font-medium text-gray-900">En ruinas</span>
            <p class="text-xs text-gray-500">Estado de conservación</p>
          </div>
        </label>

        <label class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            v-model="formData.esta_inmatriculado"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <span class="text-sm font-medium text-gray-900">Inmatriculado</span>
            <p class="text-xs text-gray-500">Registro de propiedad</p>
          </div>
        </label>

        <label class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            v-model="formData.enVenta"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div>
            <span class="text-sm font-medium text-gray-900">En venta</span>
            <p class="text-xs text-gray-500">Disponible para compra</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Estado Principal -->
    <div class="border-t pt-6">
      <InmuebleFieldEstado
        v-model="formData.estado"
        label="Estado Principal"
        :error="errors.estado"
        required
      />
    </div>

    <!-- Imagen Principal -->
    <div class="border-t pt-6">
      <h4 class="text-md font-medium text-gray-900 mb-4">Imagen Principal</h4>
      <InmuebleFieldImagen
        v-model="formData.photo"
        :error="errors.photo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InmuebleFieldText from '../fields/InmuebleFieldText.vue'
import InmuebleFieldEstado from '../fields/InmuebleFieldEstado.vue'
import InmuebleFieldUbicacion from '../fields/InmuebleFieldUbicacion.vue'
import InmuebleFieldImagen from '../fields/InmuebleFieldImagen.vue'

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

const formData = ref({ ...props.property })

watch(formData, (newFormData) => {
  emit('update:property', newFormData)
}, { deep: true })

const onUbicacionChange = (ubicacionData) => {
  formData.value = { ...formData.value, ...ubicacionData }
}
</script>