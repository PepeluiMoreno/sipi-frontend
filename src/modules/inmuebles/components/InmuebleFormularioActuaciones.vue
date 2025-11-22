<template>
  <div class="p-3 space-y-3">
    <div v-if="property.actuaciones?.length">
      <div v-for="(actuacion, i) in property.actuaciones" :key="actuacion.id" class="border rounded p-2 mb-2">
        <div class="flex items-center justify-between mb-2">
          <input v-model="actuacion.nombre" class="font-medium text-sm px-2 py-1 border rounded flex-1 mr-2" />
          <button @click="property.actuaciones.splice(i, 1)" class="text-red-600 text-xs">Eliminar</button>
        </div>
        
        <div class="grid grid-cols-2 gap-2 text-xs mb-2">
          <input type="date" v-model="actuacion.fecha_inicio" class="px-2 py-1 border rounded" />
          <input type="date" v-model="actuacion.fecha_fin" class="px-2 py-1 border rounded" />
        </div>
        
        <textarea v-model="actuacion.descripcion" rows="2" class="w-full px-2 py-1 text-xs border rounded mb-2" placeholder="Descripción..."></textarea>
        
        <input type="number" v-model="actuacion.presupuesto" class="w-full px-2 py-1 text-xs border rounded mb-2" placeholder="Presupuesto" />
        
        <!-- Técnicos -->
        <div v-if="actuacion.tecnicos?.length" class="ml-3 border-l pl-2 space-y-1">
          <div v-for="(tecnico, j) in actuacion.tecnicos" :key="j" class="flex gap-1">
            <input v-model="tecnico.tecnico_id" class="px-2 py-1 text-xs border rounded w-24" placeholder="Técnico ID" />
            <input v-model="tecnico.rol_tecnico_id" class="px-2 py-1 text-xs border rounded w-20" placeholder="Rol ID" />
            <input type="date" v-model="tecnico.fecha_inicio" class="px-2 py-1 text-xs border rounded" />
            <button @click="actuacion.tecnicos.splice(j, 1)" class="text-red-600 text-xs">×</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="property.actuaciones.push({ nombre: 'Nueva actuación', tecnicos: [] })" class="text-sm text-indigo-600 hover:text-indigo-800">+ Añadir actuación</button>
  </div>
</template>

<script setup>
defineProps(['property'])
</script>