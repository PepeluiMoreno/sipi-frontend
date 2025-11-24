<template>
  <div 
    ref="mapContainer" 
    class="leaflet-map-mini-container rounded-lg border border-gray-200 overflow-hidden"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  center: {
    type: Array,
    default: () => [40.0, -3.0]
  },
  zoom: {
    type: Number,
    default: 6
  },
  height: {
    type: String,
    default: '200px'
  },
  width: {
    type: String,
    default: '100%'
  },
  interactive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['property-click'])

const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])
const isMapReady = ref(false)

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

onMounted(async () => {
  try {
    if (!mapContainer.value) return

    // Configuración del mapa mini
    map.value = L.map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: props.interactive,
      scrollWheelZoom: props.interactive,
      doubleClickZoom: props.interactive,
      boxZoom: props.interactive,
      tap: props.interactive,
      touchZoom: props.interactive
    })

    // Capa base simplificada
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map.value)

    isMapReady.value = true
    updateMarkers()

    // Redimensionar después de montar
    setTimeout(() => {
      map.value?.invalidateSize()
    }, 100)

  } catch (error) {
    console.error('Error inicializando mapa mini:', error)
  }
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

// Watchers
watch(() => props.properties, () => {
  if (isMapReady.value) {
    updateMarkers()
  }
})

watch(() => props.center, (newCenter) => {
  if (map.value && newCenter) {
    map.value.setView(newCenter, props.zoom)
  }
})

// Métodos
const updateMarkers = () => {
  if (!map.value || !isMapReady.value) return

  // Limpiar marcadores anteriores
  markers.value.forEach(marker => {
    map.value.removeLayer(marker)
  })
  markers.value = []

  // Añadir nuevos marcadores
  props.properties.forEach(property => {
    if (!property.lat || !property.lng) return

    const marker = L.marker([property.lat, property.lng], {
      icon: L.divIcon({
        className: 'mini-marker',
        html: `<div class="w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      })
    })

    // Tooltip básico
    if (property.denominacion_principal) {
      marker.bindTooltip(property.denominacion_principal, {
        permanent: false,
        direction: 'top',
        offset: [0, -6]
      })
    }

    // Evento click
    if (props.interactive) {
      marker.on('click', () => {
        emit('property-click', property)
      })
    }

    marker.addTo(map.value)
    markers.value.push(marker)
  })

  // Ajustar vista si hay propiedades
  if (props.properties.length > 0) {
    const group = L.featureGroup(markers.value)
    map.value.fitBounds(group.getBounds().pad(0.1))
  }
}

// Exponer métodos
defineExpose({
  setView: (center, zoom) => {
    if (map.value) {
      map.value.setView(center, zoom)
    }
  },
  invalidateSize: () => {
    if (map.value) {
      map.value.invalidateSize()
    }
  }
})
</script>

<style scoped>
.leaflet-map-mini-container {
  height: v-bind(height);
  width: v-bind(width);
}

:deep(.leaflet-container) {
  height: 100% !important;
  width: 100% !important;
  font-family: inherit;
  background: #f8fafc;
}

:deep(.mini-marker) {
  background: transparent !important;
  border: none !important;
}

:deep(.leaflet-tooltip) {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-tooltip-top:before) {
  border-top-color: #e2e8f0;
}
</style>