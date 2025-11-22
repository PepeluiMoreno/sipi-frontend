<template>
  <div class="space-y-3 p-3">
    <!-- Principal -->
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
        <input v-model="property.nombre" type="text" class="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-indigo-500" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
        <input v-model="property.tipo_inmueble_id" type="text" class="w-full px-2 py-1 text-sm border rounded" />
      </div>
    </div>

    <!-- Ubicación -->
    <div class="border-t pt-2">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Ubicación</h4>
      <div class="grid grid-cols-2 gap-2">
        <input v-model="property.direccion_normalizada" placeholder="Dirección" class="px-2 py-1 text-sm border rounded col-span-2" />
        <input v-model="property.localidad_id" placeholder="Localidad ID" class="px-2 py-1 text-sm border rounded" />
        <input v-model="property.provincia_id" placeholder="Provincia ID" class="px-2 py-1 text-sm border rounded" />
      </div>
    </div>

    <!-- Estados Booleanos -->
    <div class="border-t pt-2">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Estados</h4>
      <div class="flex gap-4 text-sm">
        <label class="flex items-center"><input type="checkbox" v-model="property.es_bic" class="mr-1"> BIC</label>
        <label class="flex items-center"><input type="checkbox" v-model="property.es_ruina" class="mr-1"> Ruina</label>
        <label class="flex items-center"><input type="checkbox" v-model="property.esta_inmatriculado" class="mr-1"> Inmatriculado</label>
      </div>
    </div>

    <!-- Denominaciones -->
    <div v-if="property.denominaciones?.length" class="border-t pt-2">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Denominaciones</h4>
      <div class="max-h-32 overflow-y-auto space-y-1">
        <div v-for="denom in property.denominaciones" :key="denom.id" class="flex items-center gap-2 p-1 bg-gray-50 rounded">
          <input v-model="denom.denominacion" class="flex-1 px-2 py-1 text-xs border rounded" />
          <input type="checkbox" v-model="denom.es_principal" title="Principal">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['property'])
</script>