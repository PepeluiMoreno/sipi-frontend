<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 class="font-semibold text-gray-900">
        Seleccionados ({{ properties.length }})
      </h2>
      <div v-if="canAdd" class="flex items-center space-x-2">
        <button 
          @click="$emit('add-property', { id: Date.now(), direccion: 'Nuevo inmueble en ' + locationNombre })"
          class="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
        >
          Añadir manualmente
        </button>
      </div>
    </div>

    <!-- Lista -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="properties.length === 0" class="text-center py-12">
        <MapPinIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 mb-2">No hay inmuebles seleccionados</p>
        <p class="text-sm text-gray-400">
          {{ canAdd ? 'Haz clic en un marcador del mapa o añade manualmente' : 'Primero selecciona una localidad' }}
        </p>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div 
          v-for="property in properties" 
          :key="property.id"
          class="p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ property.direccion || 'Inmueble sin dirección' }}</h4>
              <p class="text-sm text-gray-500">
                {{ property.localidad || locationNombre }} - {{ property.provincia || '' }}
              </p>
              <div class="mt-2">
                <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {{ property.estado || 'Detectado' }}
                </span>
              </div>
            </div>
            <button 
              @click="$emit('remove-property', property.id)"
              class="text-red-600 hover:text-red-900 p-1"
              title="Eliminar de la selección"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

 