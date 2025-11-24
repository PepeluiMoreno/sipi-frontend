<template>
  <div class="p-6 space-y-4">
    <!-- Header loading -->
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      <div class="space-y-2 flex-1">
        <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>

    <!-- Cards loading -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="n in skeletonCount" 
        :key="n"
        class="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
      >
        <!-- Imagen -->
        <div class="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
        
        <!-- Contenido -->
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
          <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        <!-- Badges -->
        <div class="flex space-x-2 mt-3">
          <div class="h-6 bg-gray-200 rounded-full w-16"></div>
          <div class="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>
      </div>
    </div>

    <!-- Texto de carga -->
    <div class="text-center py-8">
      <div class="flex justify-center mb-3">
        <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="text-gray-600 text-sm">{{ message }}</p>
      <p class="text-gray-400 text-xs mt-1">{{ subMessage }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'cards', // 'cards', 'list', 'detail', 'table'
  },
  skeletonCount: {
    type: Number,
    default: 6
  },
  message: {
    type: String,
    default: 'Cargando inmuebles...'
  },
  subMessage: {
    type: String,
    default: 'Esto puede tomar unos segundos'
  }
})
</script>