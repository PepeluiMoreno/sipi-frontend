<template>
  <div 
    ref="mapContainer" 
    class="leaflet-map-container"
    :style="{ height: '100%', width: '100%' }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, inject } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { ESTADOS_INMUEBLE, ESTADO_MAPEO } from '../../../config/estadosInmueble'

const props = defineProps({
  selectedLocation: Object,
  filters: Object,
  isMini: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['property-selected', 'error', 'visible-properties-changed'])

const mapContainer = ref(null)
const map = ref(null)
const markerCluster = ref(null)
const markers = ref([])
const allProperties = ref([])
const selectedMarker = ref(null)
const isMapReady = ref(false)

// Inyectar si la modal está abierta para ajustar comportamiento
const mapModalOpen = inject('mapModalOpen', ref(false))

const SPAIN_BOUNDS = [[27.5, -18.5], [43.9, 4.8]]

const createChurchIcon = (estado, isSelected = false) => {
  const estadoConfig = ESTADOS_INMUEBLE.find(e => e.key === estado)
  const colorClass = estadoConfig ? estadoConfig.color : 'bg-gray-700'
  
  const selectedClass = isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
  
  const svg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="${selectedClass}">
      <path d="M12 2L3 9V22H10V16H14V22H21V9L12 2Z" fill="currentColor" class="${colorClass}"></path>
      <rect x="10" y="10" width="4" height="6" fill="white"></rect>
    </svg>
  `
  
  return L.divIcon({
    className: 'church-marker',
    html: `<div class="w-6 h-6 text-white">${svg}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  })
}

const mockInmuebles = [
  { id: '1', lat: 40.4168, lng: -3.7038, direccion: 'Calle Mayor 123', localidad: 'Madrid', provincia: 'Madrid', estado: 'No investigado', localidadId: '111', photo: 'https://images.unsplash.com/photo-1502005229762-cf9565b9ebea?w=100&h=100&fit=crop' },
  { id: '2', lat: 40.4180, lng: -3.7050, direccion: 'Gran Vía 45', localidad: 'Madrid', provincia: 'Madrid', estado: 'Inmatriculado', localidadId: '111', bic: true, photo: 'https://images.unsplash.com/photo-1503315082122-21e2e37b8f7c?w=100&h=100&fit=crop' },
  { id: '3', lat: 41.3851, lng: 2.1734, direccion: 'Passeig de Gràcia 100', localidad: 'Barcelona', provincia: 'Barcelona', estado: 'Vendido', localidadId: '211', photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=100&h=100&fit=crop' },
  { id: '4', lat: 28.4636, lng: -16.2518, direccion: 'Calle Castillo 12', localidad: 'Santa Cruz', provincia: 'Santa Cruz de Tenerife', estado: 'No investigado', localidadId: '411' },
  { id: '5', lat: 40.4200, lng: -3.7000, direccion: 'Plaza de Oriente 5', localidad: 'Madrid', provincia: 'Madrid', estado: 'Inmatriculado', localidadId: '111', vendido: true, photo: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=100&h=100&fit=crop' },
  { id: '6', lat: 40.0150, lng: -3.3700, direccion: 'Catedral de la Asunción', localidad: 'Toledo', provincia: 'Toledo', estado: 'Inmatriculado', localidadId: '311', bic: true }
]

onMounted(async () => {
  try {
    await nextTick()
    
    if (!mapContainer.value) {
      throw new Error('Contenedor del mapa no encontrado')
    }
    
    // Asegurar altura en modo mini
    if (props.isMini) {
      mapContainer.value.style.height = '100%'
      mapContainer.value.style.width = '100%'
    }

    map.value = L.map(mapContainer.value, {
      maxBounds: SPAIN_BOUNDS,
      maxBoundsViscosity: 1.0,
      minZoom: 6,
      maxZoom: 18,
      zoomControl: !props.isMini,
      attributionControl: !props.isMini,
      dragging: !props.isMini,
      scrollWheelZoom: !props.isMini,
      doubleClickZoom: !props.isMini,
      boxZoom: !props.isMini,
      touchZoom: !props.isMini
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value)

    markerCluster.value = L.markerClusterGroup({ 
      chunkedLoading: true,
      disableClusteringAtZoom: 16,
      maxClusterRadius: props.isMini ? 50 : 80,
      spiderfyOnMaxZoom: true,
      removeOutsideVisibleBounds: false // CRÍTICO: No eliminar marcadores fuera de vista
    })
    map.value.addLayer(markerCluster.value)

    // En modo mini, centrar en España sin zoom
    if (props.isMini) {
      map.value.setView([40.0, -3.0], 6)
    } else {
      map.value.fitBounds(SPAIN_BOUNDS)
    }
    
    map.value.on('moveend', () => {
      updateVisibleProperties()
    })
    
    map.value.on('zoomend', () => {
      updateVisibleProperties()
    })
    
    isMapReady.value = true
    loadInmuebles()

    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize()
        // Forzar actualización inicial
        updateVisibleProperties()
      }
    }, 100)

  } catch (error) {
    console.error('Error en onMounted del mapa:', error)
    emit('error', error)
  }
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

watch(() => props.selectedLocation, () => {
  loadInmuebles()
})

watch(() => props.filters, () => {
  loadInmuebles()
}, { deep: true })

const loadInmuebles = () => {
  if (!markerCluster.value || !map.value || !isMapReady.value) return

  try {
    markerCluster.value.clearLayers()
    markers.value = []
    selectedMarker.value = null

    // Filtrar por estado y ubicación
    let inmueblesToShow = mockInmuebles.filter(prop => {
      const estadoKey = ESTADO_MAPEO[prop.estado]
      if (props.filters[estadoKey] === false) return false
      
      if (props.selectedLocation && prop.localidadId !== props.selectedLocation.id) return false
      return true
    })

    inmueblesToShow.forEach(inmueble => {
      const estadoKey = ESTADO_MAPEO[inmueble.estado]
      const marker = L.marker([inmueble.lat, inmueble.lng], {
        icon: createChurchIcon(estadoKey, false)
      })

      marker.on('click', () => {
        // Deseleccionar marcador anterior
        if (selectedMarker.value) {
          const prevEstadoKey = ESTADO_MAPEO[selectedMarker.value.property.estado]
          selectedMarker.value.marker.setIcon(createChurchIcon(prevEstadoKey, false))
        }
        
        // Seleccionar nuevo marcador
        marker.setIcon(createChurchIcon(estadoKey, true))
        selectedMarker.value = { marker, property: inmueble }
        
        emit('property-selected', inmueble)
      })
      
      markerCluster.value.addLayer(marker)
      markers.value.push(marker)
    })

    allProperties.value = inmueblesToShow

    // Solo ajustar bounds en modo grande
    if (!props.isMini && inmueblesToShow.length > 0) {
      const group = new L.featureGroup(markers.value)
      map.value.fitBounds(group.getBounds().pad(0.1))
    }
    
    // IMPORTANTE: Forzar actualización después de renderizar
    setTimeout(() => {
      updateVisibleProperties()
    }, 300)

  } catch (error) {
    console.error('Error cargando inmuebles:', error)
    emit('error', error)
  }
}

const updateVisibleProperties = () => {
  if (!map.value || !isMapReady.value) return
  
  // Si no hay allProperties, usar todos los inmuebles filtrados
  const sourceProperties = allProperties.value.length > 0 
    ? allProperties.value 
    : mockInmuebles.filter(prop => {
        const estadoKey = ESTADO_MAPEO[prop.estado]
        return props.filters[estadoKey] !== false
      })
  
  // En zoom out muy grande (zoom <= 7), devolver TODOS los inmuebles filtrados
  const currentZoom = map.value.getZoom()
  let visibleProperties = []
  
  if (currentZoom <= 7 || !props.isMini) {
    // Zoom out máximo: mostrar todos
    visibleProperties = sourceProperties
  } else {
    // Zoom normal: filtrar por bounds
    const bounds = map.value.getBounds()
    visibleProperties = sourceProperties.filter(prop => {
      return bounds.contains([prop.lat, prop.lng])
    })
  }
  
  emit('visible-properties-changed', visibleProperties)
}

// Método para centrar el mapa en una propiedad específica
const centerOnProperty = (property) => {
  if (!map.value || !property) return
  
  map.value.setView([property.lat, property.lng], 16)
  
  // Encontrar y seleccionar el marcador correspondiente
  setTimeout(() => {
    markers.value.forEach(marker => {
      const markerLatLng = marker.getLatLng()
      if (Math.abs(markerLatLng.lat - property.lat) < 0.0001 && 
          Math.abs(markerLatLng.lng - property.lng) < 0.0001) {
        marker.fire('click')
      }
    })
  }, 100)
}

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

:global(.leaflet-container) {
  height: 100% !important;
  width: 100% !important;
}

:global(.church-marker) {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

:global(.church-marker:hover) {
  transform: scale(1.1);
  transition: transform 0.2s;
}
</style>