<template>
  <div class="relative">
    <!-- Leaflet Map -->
    <div ref="mapContainer" class="w-full h-full z-0"></div>
    
    <!-- Controls overlay -->
    <div class="absolute top-4 right-4 z-10 bg-white rounded-lg shadow p-2 space-y-2">
      <button 
        @click="fitBounds"
        class="p-2 rounded hover:bg-gray-100"
        title="Ajustar vista"
      >
        <ArrowsPointingInIcon class="w-5 h-5 text-gray-600" />
      </button>
      <button 
        @click="showAllProperties = !showAllProperties"
        class="p-2 rounded hover:bg-gray-100"
        :class="{ 'bg-indigo-50': showAllProperties }"
        title="Mostrar todos"
      >
        <EyeIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Info panel -->
    <div v-if="selectedProperty" class="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow p-4 max-w-sm">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-semibold text-gray-900">{{ selectedProperty.direccion }}</h4>
        <button @click="selectedProperty = null" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
      <p class="text-sm text-gray-600 mb-3">{{ selectedProperty.localidad }}, {{ selectedProperty.provincia }}</p>
      <div class="flex justify-between items-center">
        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {{ selectedProperty.estado }}
        </span>
        <button 
          @click="$emit('property-selected', selectedProperty)"
          class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          Seleccionar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import {
  ArrowsPointingInIcon,
  EyeIcon,
  XMarkIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  selectedLocation: Object,
  selectedProperties: Array,
  showAll: Boolean
})

const emit = defineEmits(['property-selected'])

const mapContainer = ref(null)
const map = ref(null)
const markerCluster = ref(null)
const markers = ref([])
const selectedProperty = ref(null)
const showAllProperties = ref(props.showAll || false)

// Mock data de propiedades
const mockProperties = [
  { id: '1', lat: 40.4168, lng: -3.7038, direccion: 'Calle Mayor 123', localidad: 'Madrid', provincia: 'Madrid', estado: 'Detectado', ccaaId: '1', provinciaId: '11', localidadId: '111' },
  { id: '2', lat: 40.4180, lng: -3.7050, direccion: 'Gran Vía 45', localidad: 'Madrid', provincia: 'Madrid', estado: 'Inmatriculado', ccaaId: '1', provinciaId: '11', localidadId: '111' },
  { id: '3', lat: 40.4170, lng: -3.7040, direccion: 'Plaza del Sol 1', localidad: 'Madrid', provincia: 'Madrid', estado: 'BIC', ccaaId: '1', provinciaId: '11', localidadId: '111' },
  { id: '4', lat: 41.3851, lng: 2.1734, direccion: 'Passeig de Gràcia 100', localidad: 'Barcelona', provincia: 'Barcelona', estado: 'En venta', ccaaId: '2', provinciaId: '21', localidadId: '211' },
  { id: '5', lat: 41.3833, lng: 2.1811, direccion: 'Carrer de Ferran 25', localidad: 'Barcelona', provincia: 'Barcelona', estado: 'Vendido', ccaaId: '2', provinciaId: '21', localidadId: '211' }
]

onMounted(() => {
  // Inicializar mapa centrado en España
  map.value = L.map(mapContainer.value).setView([40.4168, -3.7038], 6)
  
  // Capa de tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)
  
  // Cluster de marcadores
  markerCluster.value = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: true
  })
  map.value.addLayer(markerCluster.value)
  
  loadProperties()
})

watch(() => props.selectedLocation, () => {
  loadProperties()
})

const loadProperties = () => {
  if (!markerCluster.value) return
  
  // Limpiar marcadores
  markerCluster.value.clearLayers()
  markers.value = []
  
  // Filtrar propiedades según localidad seleccionada
  let propertiesToShow = mockProperties
  if (props.selectedLocation) {
    propertiesToShow = mockProperties.filter(p => 
      p.localidadId === props.selectedLocation.id || props.showAllProperties
    )
  }
  
  // Crear marcadores
  propertiesToShow.forEach(prop => {
    const isSelected = props.selectedProperties.find(sp => sp.id === prop.id)
    
    const marker = L.marker([prop.lat, prop.lng], {
      icon: L.divIcon({
        className: `custom-marker ${isSelected ? 'selected' : ''}`,
        html: `<div class="w-4 h-4 rounded-full border-2 ${
          isSelected ? 'bg-indigo-600 border-white' : getStatusColor(prop.estado)
        } shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      })
    })
    
    marker.on('click', () => {
      selectedProperty.value = prop
      emit('property-selected', prop)
    })
    
    markerCluster.value.addLayer(marker)
    markers.value.push(marker)
  })
  
  // Ajustar vista
  if (propertiesToShow.length > 0) {
    const group = new L.featureGroup(markers.value)
    map.value.fitBounds(group.getBounds().pad(0.1))
  }
}

const getStatusColor = (estado) => {
  const colors = {
    'Detectado': 'bg-blue-500 border-blue-700',
    'Inmatriculado': 'bg-green-500 border-green-700',
    'BIC': 'bg-purple-500 border-purple-700',
    'En venta': 'bg-yellow-500 border-yellow-700',
    'Vendido': 'bg-gray-500 border-gray-700'
  }
  return colors[estado] || 'bg-gray-500 border-gray-700'
}

const fitBounds = () => {
  if (markers.value.length > 0) {
    const group = new L.featureGroup(markers.value)
    map.value.fitBounds(group.getBounds().pad(0.1))
  }
}

watch(showAllProperties, () => {
  loadProperties()
})
</script>

<style>
/* Estilos para marcadores */
.custom-marker div {
  transition: all 0.2s;
}

.custom-marker:hover div {
  transform: scale(1.3);
}

/* Fix para Leaflet en contenedores flex */
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
}
</style>