<template>
  <div class="space-y-4">
    <div v-if="property.inmatriculacion">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Inmatriculación</label>
          <input :value="property.inmatriculacion.fecha" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Registro de Propiedad</label>
          <input :value="property.inmatriculacion.registro" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
        <textarea :value="property.inmatriculacion.observaciones" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 resize-none" readonly></textarea>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <DocumentIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p>No hay datos de inmatriculación</p>
    </div>
  </div>
</template>

<script setup>
import { DocumentIcon } from '@heroicons/vue/24/outline'

defineProps(['property'])
</script>