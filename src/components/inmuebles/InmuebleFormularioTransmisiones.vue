<template>
  <div class="space-y-4">
    <div v-if="property.transmisiones && property.transmisiones.length > 0">
      <div v-for="(transmision, index) in property.transmisiones" :key="index" class="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
        <h4 class="font-medium text-gray-900 mb-3 flex items-center">
          <ArrowPathIcon class="w-5 h-5 mr-2 text-indigo-600" />
          Transmisión #{{ index + 1 }}
        </h4>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span class="text-gray-500">Tipo:</span>
            <span class="ml-2 text-gray-900 font-medium">{{ transmision.tipo }}</span>
          </div>
          <div>
            <span class="text-gray-500">Fecha:</span>
            <span class="ml-2 text-gray-900 font-medium">{{ transmision.fecha }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-gray-500">Adquirente:</span>
            <span class="ml-2 text-gray-900">{{ transmision.adquirente || 'No especificado' }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-gray-500">Transmisor:</span>
            <span class="ml-2 text-gray-900">{{ transmision.transmisor || 'No especificado' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <ArrowPathIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p>No hay transmisiones registradas</p>
    </div>
  </div>
</template>

<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

defineProps(['property'])
</script>