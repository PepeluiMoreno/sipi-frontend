<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Actuaciones</h3>
        <p class="text-sm text-gray-600 mt-1">Gestionar intervenciones y obras en el inmueble</p>
      </div>
      <button
        @click="agregarActuacion"
        class="btn btn-primary btn-sm"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Nueva Actuación
      </button>
    </div>

    <!-- Lista de actuaciones -->
    <div class="space-y-4">
      <div
        v-for="(actuacion, index) in actuaciones"
        :key="actuacion.id"
        class="border border-gray-200 rounded-lg p-4 bg-white"
      >
        <!-- Header de actuación -->
        <div class="flex items-center justify-between mb-4">
          <input
            v-model="actuacion.nombre"
            placeholder="Nombre de la actuación"
            class="text-lg font-medium text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-full"
            :class="{ 'text-gray-400': !actuacion.nombre }"
          />
          <button
            @click="eliminarActuacion(index)"
            class="btn btn-ghost btn-sm !text-red-600 hover:!bg-red-50"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Fechas -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
            <input
              type="date"
              v-model="actuacion.fecha_inicio"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
            <input
              type="date"
              v-model="actuacion.fecha_fin"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- Descripción -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            v-model="actuacion.descripcion"
            rows="3"
            placeholder="Describe los trabajos realizados..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Presupuesto -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Presupuesto (€)</label>
          <input
            type="number"
            v-model="actuacion.presupuesto"
            placeholder="0.00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Técnicos -->
        <div class="border-t pt-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-medium text-gray-900">Técnicos asignados</h4>
            <button
              @click="agregarTecnico(actuacion)"
              class="btn btn-ghost btn-sm"
            >
              <PlusIcon class="w-4 h-4 mr-1" />
              Añadir
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="(tecnico, techIndex) in actuacion.tecnicos"
              :key="techIndex"
              class="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
            >
              <input
                v-model="tecnico.tecnico_id"
                placeholder="ID Técnico"
                class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              />
              <input
                v-model="tecnico.rol_tecnico_id"
                placeholder="Rol"
                class="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="date"
                v-model="tecnico.fecha_inicio"
                class="w-32 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
              />
              <button
                @click="eliminarTecnico(actuacion, techIndex)"
                class="btn btn-ghost btn-sm !p-1 !text-red-600"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div
      v-if="actuaciones.length === 0"
      class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg"
    >
      <WrenchScrewdriverIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h4 class="text-lg font-medium text-gray-900 mb-2">No hay actuaciones</h4>
      <p class="text-gray-500 mb-4">Añade la primera actuación para este inmueble</p>
      <button
        @click="agregarActuacion"
        class="btn btn-primary"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Crear Primera Actuación
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

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

const actuaciones = ref(props.property.actuaciones || [])

watch(actuaciones, (newActuaciones) => {
  emit('update:property', {
    ...props.property,
    actuaciones: newActuaciones
  })
}, { deep: true })

const agregarActuacion = () => {
  actuaciones.value.push({
    id: Date.now().toString(),
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    presupuesto: null,
    tecnicos: [],
    created_at: new Date().toISOString()
  })
}

const eliminarActuacion = (index) => {
  actuaciones.value.splice(index, 1)
}

const agregarTecnico = (actuacion) => {
  actuacion.tecnicos.push({
    tecnico_id: '',
    rol_tecnico_id: '',
    fecha_inicio: ''
  })
}

const eliminarTecnico = (actuacion, index) => {
  actuacion.tecnicos.splice(index, 1)
}
</script>