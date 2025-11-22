<template>
  <div class="p-3" v-if="property.inmatriculacion">
    <div class="space-y-2">
      <input type="date" v-model="property.inmatriculacion.fecha" class="w-full px-2 py-1 text-sm border rounded" />
      <input v-model="property.inmatriculacion.registro_propiedad_id" placeholder="Registro ID" class="w-full px-2 py-1 text-sm border rounded" />
      <select v-model="property.inmatriculacion.tipo_certificacion_propiedad_id" class="w-full px-2 py-1 text-sm border rounded">
        <option value="">Tipo certificación</option>
      </select>
      <textarea v-model="property.inmatriculacion.observaciones" rows="2" class="w-full px-2 py-1 text-sm border rounded" placeholder="Observaciones..."></textarea>
    </div>
  </div>
  <div v-else class="p-3 text-center text-gray-500 text-sm">No hay datos de inmatriculación</div>
</template>

<script setup>
defineProps(['property'])
</script>