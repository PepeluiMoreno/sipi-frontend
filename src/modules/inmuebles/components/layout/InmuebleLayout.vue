<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <InmuebleSidebar 
      :filters="filters"
      :is-collapsed="isSidebarCollapsed"
      @filters-change="$emit('filters-change', $event)"
      @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed"
    />
    
    <!-- Contenido Principal -->
    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300"
         :class="isSidebarCollapsed ? 'ml-16' : 'ml-80'">
      
      <!-- Header -->
      <InmuebleHeader 
        :title="title"
        :subtitle="subtitle"
        :view-mode="viewMode"
        :filter-stats="filterStats"
        :selected-inmueble="selectedInmueble"
        :loading="loading"
        :show-view-selector="showViewSelector"
        :show-map-button="showMapButton"
        @view-change="$emit('view-change', $event)"
        @create-inmueble="$emit('create-inmueble')"
        @open-map="$emit('open-map')"
      />
      
      <!-- Contenido de la Vista -->
      <main class="flex-1 overflow-hidden">
        <slot 
          :inmuebles="inmuebles"
          :filtered-inmuebles="filteredInmuebles"
          :selected-inmueble="selectedInmueble"
        />
      </main>

      <!-- Notificaciones -->
      <div 
        v-if="notification.show"
        class="fixed bottom-4 right-4 z-50"
      >
        <div 
          class="p-4 rounded-lg shadow-lg border max-w-sm"
          :class="notificationClasses"
        >
          <div class="flex items-center">
            <component 
              :is="notificationIcon" 
              class="w-5 h-5 mr-3" 
            />
            <div class="flex-1">
              <p class="text-sm font-medium">{{ notification.title }}</p>
              <p class="text-sm opacity-90 mt-1">{{ notification.message }}</p>
            </div>
            <button 
              @click="notification.show = false"
              class="ml-4 text-current opacity-70 hover:opacity-100"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'
import InmuebleSidebar from './InmuebleSidebar.vue'
import InmuebleHeader from './InmuebleHeader.vue'

defineProps({
  title: {
    type: String,
    default: 'Explorador de Inmuebles'
  },
  subtitle: {
    type: String,
    default: 'Gestione y consulte el patrimonio inmobiliario'
  },
  filters: {
    type: Object,
    default: () => ({})
  },
  filterStats: {
    type: Object,
    default: () => ({
      total: 0,
      filtered: 0,
      tieneFiltros: false
    })
  },
  inmuebles: {
    type: Array,
    default: () => []
  },
  filteredInmuebles: {
    type: Array,
    default: () => []
  },
  selectedInmueble: {
    type: Object,
    default: null
  },
  viewMode: {
    type: String,
    default: 'explorer'
  },
  loading: {
    type: Boolean,
    default: false
  },
  showViewSelector: {
    type: Boolean,
    default: true
  },
  showMapButton: {
    type: Boolean,
    default: true
  }
})

defineEmits([
  'filters-change',
  'view-change', 
  'create-inmueble',
  'open-map',
  'select-inmueble'
])

const isSidebarCollapsed = ref(false)

// Sistema de notificaciones
const notification = ref({
  show: false,
  type: 'success', // 'success', 'warning', 'error'
  title: '',
  message: '',
  timeout: null
})

// Computed para clases de notificación
const notificationClasses = computed(() => {
  const base = 'border-l-4'
  const types = {
    success: 'bg-green-50 border-green-400 text-green-800 border-green-200',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 border-red-400 text-red-800 border-red-200'
  }
  return `${base} ${types[notification.value.type]}`
})

const notificationIcon = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon
  }
  return icons[notification.value.type]
})

// Método para mostrar notificaciones
const showNotification = (type, title, message, duration = 5000) => {
  // Limpiar timeout anterior
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
  }

  notification.value = {
    show: true,
    type,
    title,
    message,
    timeout: setTimeout(() => {
      notification.value.show = false
    }, duration)
  }
}

// Exponer métodos para uso externo
defineExpose({
  showNotification
})
</script>