<template>
  <div class="p-3 space-y-3">
    <div v-if="property.transmisiones?.length">
      <div v-for="(transmision, i) in property.transmisiones" :key="i" class="border rounded p-2 mb-2">
        <div class="flex items-center justify-between mb-2">
          <select v-model="transmision.tipo_transmision_id" class="text-sm px-2 py-1 border rounded flex-1 mr-2">
            <option value="">Tipo transmisión</option>
          </select>
          <button @click="property.transmisiones.splice(i, 1)" class="text-red-600 text-xs">Eliminar</button>
        </div>
        
        <input type="date" v-model="transmision.fecha_transmision" class="w-full px-2 py-1 text-xs border rounded mb-1" />
        <input type="number" v-model="transmision.precio_venta" class="w-full px-2 py-1 text-xs border rounded mb-1" placeholder="Precio venta" />
        
        <div class="grid grid-cols-2 gap-1 text-xs">
          <input v-model="transmision.transmitente_id" placeholder="Transmitente ID" class="px-2 py-1 border rounded" />
          <input v-model="transmision.adquiriente_id" placeholder="Adquiriente ID" class="px-2 py-1 border rounded" />
        </div>
      </div>
    </div>
    <button @click="property.transmisiones.push({ id: Date.now() })" class="text-sm text-indigo-600 hover:text-indigo-800">+ Añadir transmisión</button>
  </div>
</template>

<script setup>
defineProps(['property'])
</script>