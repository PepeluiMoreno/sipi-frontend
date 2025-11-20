<template>
  <div class="space-y-4">
    <div v-if="property.osm" class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">OSM ID</label>
        <input :value="property.osm.osm_id" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo OSM</label>
        <input :value="property.osm.osm_type" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre OSM</label>
        <input :value="property.osm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Diócesis OSM</label>
        <input :value="property.osm.diocese" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Dirección OSM</label>
        <input :value="property.osm.address_street" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly />
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      <MapPinIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p>No hay datos de OpenStreetMap</p>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'

defineProps(['property'])
</script>