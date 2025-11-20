<template>
  <div class="space-y-4">
    <div v-if="property.actuaciones && property.actuaciones.length > 0">
      <div v-for="(actuacion, index) in property.actuaciones" :key="index" class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
        <h4 class="font-medium text-gray-900 mb-3 flex items-center">
          <WrenchScrewdriverIcon class="w-5 h-5 mr-2 text-indigo-600" />
          Actuación #{{ index + 1 }}
        </h4>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span class="text-gray-500">Tipo:</span>
            <span class="ml-2 text-gray-900 font-medium">{{ actuacion.tipo }}</span>
          </div>
          <div>
            <span class="text-gray-500">Fecha:</span>
            <span class="ml-2 text-gray-900 font-medium">{{ actuacion.fecha }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-gray-500">Descripción:</span>
            <p class="mt-2 text-gray-900 bg-gray-50 p-3 rounded">{{ actuacion.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <WrenchScrewdriverIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p>No hay actuaciones registradas</p>
    </div>
  </div>
</template>

<script setup>
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'

defineProps(['property'])
</script>