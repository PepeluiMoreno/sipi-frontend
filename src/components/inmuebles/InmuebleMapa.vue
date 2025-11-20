<template>
  <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'

const props = defineProps({
  selectedLocation: Object,
  filters: Object
})

const emit = defineEmits(['property-selected'])

const mapContainer = ref(null)
const map = ref(null)
const markerCluster = ref(null)
const markers = ref([])

const SPAIN_BOUNDS = [[27.5, -18.5], [43.9, 4.8]]

const mockProperties = [
  { id: '1', lat: 40.4168, lng: -3.7038, direccion: 'Calle Mayor 123', localidad: 'Madrid', provincia: 'Madrid', estado: 'Detectado', localidadId: '111', inmatriculado: true, bic: false },
  { id: '2', lat: 40.4180, lng: -3.7050, direccion: 'Gran Vía 45', localidad: 'Madrid', provincia: 'Madrid', estado: 'Inmatriculado', localidadId: '111', inmatriculado: true, bic: true },
  { id: '3', lat: 41.3851, lng: 2.1734, direccion: 'Passeig de Gràcia 100', localidad: 'Barcelona', provincia: 'Barcelona', estado: 'En venta', localidadId: '211', inmatriculado: true, bic: false },
  { id: '4', lat: 28.4636, lng: -16.2518, direccion: 'Calle Castillo 12', localidad: 'Santa Cruz', provincia: 'Santa Cruz de Tenerife', estado: 'Detectado', localidadId: '511', inmatriculado: false, bic: false }
]

onMounted(() => {
  map.value = L.map(mapContainer.value, {
    maxBounds: SPAIN_BOUNDS,
    maxBoundsViscosity: 1.0,
    minZoom: 6,
    maxZoom: 18
  }).fitBounds(SPAIN_BOUNDS)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)
  
  markerCluster.value = L.markerClusterGroup({ chunkedLoading: true })
  map.value.addLayer(markerCluster.value)
  
  loadProperties()
})


watch(() => props.selectedLocation, () => {
  if (markerCluster.value) {
    loadProperties()
  }
})

watch(() => props.filters, () => {
  if (markerCluster.value) {
    loadProperties()
  }
}, { deep: true })

const loadProperties = () => {
  if (!markerCluster.value) return
  markerCluster.value.clearLayers()
  markers.value = []
  
  let propertiesToShow = mockProperties.filter(prop => {
    if (props.selectedLocation && prop.localidadId !== props.selectedLocation.id) return false
    if (props.filters?.bic && !prop.bic) return false
    return true
  })
  
  propertiesToShow.forEach(prop => {
    const marker = L.marker([prop.lat, prop.lng], {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div class="w-4 h-4 rounded-full border-2 ${getStatusColor(prop.estado)} shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      })
    })
    
    marker.on('click', () => emit('property-selected', prop))
    markerCluster.value.addLayer(marker)
    markers.value.push(marker)
  })
  
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
</script>

<style>
.leaflet-container { width: 100% !important; height: 100% !important; }
.custom-marker div { transition: all 0.2s; }
.custom-marker:hover div { transform: scale(1.3); }
</style>