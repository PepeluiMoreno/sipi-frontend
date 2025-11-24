<template>
  <div class="inmueble-card" @click="$emit('click', inmueble)">
    <div class="card-image">
      <img :src="inmueble.photo" :alt="inmueble.denominacion_principal" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ inmueble.denominacion_principal }}</h3>
      <p class="card-address">{{ inmueble.direccion }}</p>
      <div class="card-badges">
        <span class="badge-estado" :class="`estado-${inmueble.estado.toLowerCase().replace(' ', '-')}`">
          {{ inmueble.estado }}
        </span>
        <span v-if="inmueble.es_bic" class="badge-bic">BIC</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  inmueble: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.inmueble-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: box-shadow 0.15s ease;
  overflow: hidden;
}

.inmueble-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.card-image {
  height: 12rem;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.card-address {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.card-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge-estado, .badge-bic {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-estado {
  background: #e5e7eb;
  color: #374151;
}

.badge-bic {
  background: #8b5cf6;
  color: white;
}
</style>