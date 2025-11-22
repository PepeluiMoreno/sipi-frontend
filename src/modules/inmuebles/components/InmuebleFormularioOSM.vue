<template>
  <div class="h-64 p-2 overflow-y-auto">
    <div v-if="property.osm_ext" class="space-y-2">
      <div class="grid grid-cols-2 gap-1">
        <input v-model="property.osm_ext.osm_id" placeholder="OSM ID" class="px-2 py-1 text-xs border rounded" />
        <input v-model="property.osm_ext.osm_type" placeholder="Tipo" class="px-2 py-1 text-xs border rounded" />
        <input v-model="property.osm_ext.name" placeholder="Nombre OSM" class="px-2 py-1 text-xs border rounded col-span-2" />
      </div>
      
      <div class="flex gap-4 text-xs pt-1">
        <label class="flex items-center"><input type="checkbox" v-model="property.osm_ext.ruins" class="mr-1"> Ruinas</label>
        <label class="flex items-center"><input type="checkbox" v-model="property.osm_ext.has_polygon" class="mr-1"> Polígono</label>
      </div>
      
      <input type="date" v-model="property.osm_ext.source_updated_at" class="w-32 px-2 py-1 text-xs border rounded" />
    </div>
    
    <div v-else class="h-full flex items-center justify-center">
      <div class="text-center text-gray-400">
        <ExclamationTriangleIcon class="w-8 h-8 mx-auto mb-2" />
        <p class="text-xs">No hay datos de OpenStreetMap</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
defineProps(['property'])
</script>