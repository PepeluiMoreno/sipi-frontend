<template>
  <div 
    ref="mapContainer" 
    class="leaflet-map-container"
    :style="{ height: '100%', width: '100%' }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { ESTADOS_INMUEBLE, ESTADO_MAPEO } from '../../mocks'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  selectedProperty: {
    type: Object,
    default: null
  },
  isMini: {
    type: Boolean,
    default: false
  },
  center: {
    type: Array,
    default: () => [40.0, -3.0]
  },
  zoom: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['property-selected', 'visible-properties-changed', 'error'])

const mapContainer = ref(null)
const map = ref(null)
const markerCluster = ref(null)
const markers = ref([])
const selectedMarker = ref(null)
const isMapReady = ref(false)

const SPAIN_BOUNDS = [[27.5, -18.5], [43.9, 4.8]]

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const createChurchIcon = (estado, isSelected = false) => {
  const estadoConfig = ESTADOS_INMUEBLE.find(e => e.key === estado)
  const colorClass = estadoConfig ? estadoConfig.color : 'bg-gray-600'
  
  const selectedClass = isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 scale-110' : ''
  
  const svg = `
    <div class="church-marker ${selectedClass}">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 9V22H10V16H14V22H21V9L12 2Z" fill="currentColor" class="${colorClass}"></path>
        <rect x="10" y="10" width="4" height="6" fill="white"></rect>
      </svg>
    </div>
  `
  
  return L.divIcon({
    className: 'custom-church-marker',
    html: svg,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  })
}

onMounted(async () => {
  try {
    await nextTick()
    
    if (!mapContainer.value) {
      throw new Error('Contenedor del mapa no encontrado')
    }

    // Configuración del mapa
    map.value = L.map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      maxBounds: SPAIN_BOUNDS,
      maxBoundsViscosity: 1.0,
      minZoom: 6,
      maxZoom: 18,
      zoomControl: !props.isMini,
      attributionControl: !props.isMini
    })

    // Capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map.value)

    // Cluster de marcadores
    markerCluster.value = L.markerClusterGroup({
      chunkedLoading: true,
      disableClusteringAtZoom: 16,
      maxClusterRadius: props.isMini ? 50 : 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false
    })
    map.value.addLayer(markerCluster.value)

    // Eventos del mapa
    map.value.on('moveend', updateVisibleProperties)
    map.value.on('zoomend', updateVisibleProperties)
    
    isMapReady.value = true
    updateMarkers()

    // Forzar redimensionamiento inicial
    setTimeout(() => {
      map.value?.invalidateSize()
    }, 100)

  } catch (error) {
    console.error('Error inicializando el mapa:', error)
    emit('error', error)
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

watch(() => props.selectedProperty, (newProperty) => {
  if (newProperty && isMapReady.value) {
    centerOnProperty(newProperty)
  }
})

// Métodos
const updateMarkers = () => {
  if (!markerCluster.value || !isMapReady.value) return

  // Limpiar marcadores anteriores
  markerCluster.value.clearLayers()
  markers.value = []
  selectedMarker.value = null

  // Añadir nuevos marcadores
  props.properties.forEach(property => {
    if (!property.lat || !property.lng) return

    const estadoKey = ESTADO_MAPEO[property.estado]
    const marker = L.marker([property.lat, property.lng], {
      icon: createChurchIcon(estadoKey, false)
    })

    // Popup informativo
    const popupContent = `
      <div class="p-2 min-w-[200px]">
        <h4 class="font-semibold text-gray-900 text-sm mb-1">${property.denominacion_principal || 'Sin denominación'}</h4>
        <p class="text-xs text-gray-600 mb-2">${property.direccion_normalizada || 'Dirección no especificada'}</p>
        <div class="flex flex-wrap gap-1">
          <span class="px-2 py-1 text-xs font-medium text-white rounded-sm ${ESTADOS_INMUEBLE.find(e => e.key === estadoKey)?.color || 'bg-gray-600'}">
            ${property.estado}
          </span>
          ${property.es_bic ? '<span class="px-2 py-1 text-xs font-medium text-white rounded-sm bg-purple-600">BIC</span>' : ''}
        </div>
        <button class="w-full mt-2 px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors" 
                onclick="this.dispatchEvent(new CustomEvent('select-property', { detail: '${property.id}', bubbles: true }))">
          Seleccionar
        </button>
      </div>
    `

    marker.bindPopup(popupContent)

    // Evento click
    marker.on('click', () => {
      // Deseleccionar marcador anterior
      if (selectedMarker.value) {
        const prevEstadoKey = ESTADO_MAPEO[selectedMarker.value.property.estado]
        selectedMarker.value.marker.setIcon(createChurchIcon(prevEstadoKey, false))
      }
      
      // Seleccionar nuevo marcador
      marker.setIcon(createChurchIcon(estadoKey, true))
      selectedMarker.value = { marker, property }
      
      emit('property-selected', property)
    })

    markerCluster.value.addLayer(marker)
    markers.value.push({ marker, property })
  })

  // Ajustar vista si hay propiedades
  if (props.properties.length > 0 && !props.isMini) {
    const group = L.featureGroup(markers.value.map(m => m.marker))
    map.value.fitBounds(group.getBounds().pad(0.1))
  }
}

const centerOnProperty = (property) => {
  if (!map.value || !property) return
  
  map.value.setView([property.lat, property.lng], 16)
  
  // Encontrar y seleccionar marcador
  setTimeout(() => {
    const markerObj = markers.value.find(m => 
      m.property.id === property.id
    )
    
    if (markerObj) {
      markerObj.marker.fire('click')
    }
  }, 100)
}

const updateVisibleProperties = () => {
  if (!map.value || !isMapReady.value) return
  
  const bounds = map.value.getBounds()
  const currentZoom = map.value.getZoom()
  
  let visibleProperties = []
  
  if (currentZoom <= 7) {
    // Zoom out máximo: mostrar todos
    visibleProperties = props.properties
  } else {
    // Filtrar por bounds
    visibleProperties = props.properties.filter(property => {
      return bounds.contains([property.lat, property.lng])
    })
  }
  
  emit('visible-properties-changed', visibleProperties)
}

// Manejar eventos personalizados del popup
onMounted(() => {
  document.addEventListener('select-property', (event) => {
    const propertyId = event.detail
    const property = props.properties.find(p => p.id === propertyId)
    if (property) {
      emit('property-selected', property)
    }
  })
})

// Exponer métodos
defineExpose({
  centerOnProperty,
  updateVisibleProperties
})
</script>

<style scoped>
.leaflet-map-container {
  height: 100% !important;
  width: 100% !important;
}

:deep(.leaflet-container) {
  height: 100% !important;
  width: 100% !important;
  font-family: inherit;
}

:deep(.custom-church-marker) {
  background: transparent !important;
  border: none !important;
}

:deep(.church-marker) {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  transition: all 0.2s ease;
}

:deep(.church-marker:hover) {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
  transform: scale(1.1);
}

:deep(.leaflet-popup-content) {
  margin: 8px 12px;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>