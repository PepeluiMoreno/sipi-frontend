<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Documentación</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <div class="p-2 bg-blue-100 rounded-lg">
            <DocumentTextIcon class="w-6 h-6 text-blue-600" />
          </div>
          <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pendiente</span>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">Documento #{{ 5000 + i }}</h3>
        <p class="text-sm text-gray-500 mb-4">Escritura de propiedad para inmueble #{{ 1200 + i }}</p>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400">Subido hace {{ i }} días</span>
          <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
            Ver documento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
</script>