<template>
  <div class="space-y-3 p-4">
    <InmuebleCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
      :is-selected="selectedProperty?.id === property.id"
      @select="$emit('property-selected', property)"
      class="w-full"
    />
    
    <!-- Estados -->
    <InmuebleLoadingState v-if="loading" />
    
    <InmuebleEmptyState
      v-else-if="properties.length === 0"
      :has-filters="hasFilters"
      @clear-filters="$emit('clear-filters')"
    />
  </div>
</template>

<script setup>
import InmuebleCard from './InmuebleCard.vue'
import InmuebleLoadingState from '../ui/InmuebleLoadingState.vue'
import InmuebleEmptyState from '../ui/InmuebleEmptyState.vue'

defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  selectedProperty: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  hasFilters: {
    type: Boolean,
    default: false
  }
})

defineEmits(['property-selected', 'clear-filters'])
</script>