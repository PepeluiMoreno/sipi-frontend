<template>
  <div class="p-3 space-y-3" v-if="property.wd_ext">
    <input v-model="property.wd_ext.wikidata_qid" placeholder="Wikidata QID" class="w-full px-2 py-1 text-sm border rounded" />
    <input v-model="property.wd_ext.commons_category" placeholder="Categoría Commons" class="w-full px-2 py-1 text-sm border rounded" />
    <input v-model="property.wd_ext.inception" placeholder="Inception" class="w-full px-2 py-1 text-sm border rounded" />
    <input type="date" v-model="property.wd_ext.source_updated_at" class="w-full px-2 py-1 text-sm border rounded" />
  </div>
  <div v-else class="p-3 text-center text-gray-500 text-sm">No hay datos de Wikidata</div>
</template>

<script setup>
defineProps(['property'])
</script>