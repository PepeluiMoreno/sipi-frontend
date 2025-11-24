<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <h1 class="toolbar-title">Inventario de Inmuebles</h1>
      <div v-if="selectedCount > 0" class="selection-info">
        {{ selectedCount }} inmueble(s) seleccionado(s)
      </div>
    </div>
    
    <div class="toolbar-right">
      <!-- Botones de vista -->
      <div class="view-toggle-group">
        <button 
          @click="$emit('view-change', 'grid')"
          :class="{ active: viewMode === 'grid' }"
          class="view-toggle-btn"
          title="Vista grid"
        >
          <i class="fas fa-th"></i>
          <span>Grid</span>
        </button>
        
        <button 
          @click="$emit('view-change', 'mapa')"
          :class="{ active: viewMode === 'mapa' }"
          class="view-toggle-btn"
          title="Vista mapa"
        >
          <i class="fas fa-map"></i>
          <span>Mapa</span>
        </button>
      </div>

      <!-- Separador -->
      <div class="toolbar-divider"></div>

      <!-- Botones de acción -->
      <button 
        @click="$emit('refresh')"
        class="action-btn"
        title="Actualizar datos"
      >
        <i class="fas fa-sync-alt"></i>
      </button>
      
      <button 
        @click="$emit('export')"
        class="action-btn"
        title="Exportar datos"
        :disabled="selectedCount === 0"
      >
        <i class="fas fa-download"></i>
      </button>
      
      <button 
        @click="$emit('create')"
        class="create-btn"
      >
        <i class="fas fa-plus"></i>
        <span>Nuevo Inmueble</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  viewMode: {
    type: String,
    default: 'grid'
  },
  selectedCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['view-change', 'create', 'refresh', 'export'])
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  min-height: 72px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.selection-info {
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.view-toggle-group {
  display: flex;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.25rem;
}

.view-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.view-toggle-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.view-toggle-btn.active {
  background: white;
  color: #111827;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: #e5e7eb;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.action-btn:hover {
  background: #f9fafb;
  color: #374151;
  border-color: #9ca3af;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.create-btn:hover {
  background: #1d4ed8;
}
</style>