// src/modules/core/mocks/index.js
// Mocks centralizados para toda la aplicación
export const ESTADOS_INMUEBLE = [
  { key: 'no_investigado', label: 'No investigado', color: 'bg-gray-600' },
  { key: 'inmatriculado', label: 'Inmatriculado', color: 'bg-green-600' },
  { key: 'vendido', label: 'Vendido', color: 'bg-orange-600' },
  { key: 'en_venta', label: 'En venta', color: 'bg-yellow-600' },
  { key: 'bic', label: 'BIC', color: 'bg-purple-600' }
]

export const ESTADO_MAPEO = {
  'No investigado': 'no_investigado',
  'Inmatriculado': 'inmatriculado', 
  'Vendido': 'vendido',
  'En venta': 'en_venta',
  'BIC': 'bic'
}

export const mockInmuebles = [
  { 
    id: '1', lat: 40.4168, lng: -3.7038, 
    direccion: 'Calle Mayor 123', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'No investigado', localidadId: '111', 
    denominacion_principal: 'Iglesia de San Miguel', 
    direccion_normalizada: 'Calle Mayor, 123', 
    es_bic: false, enVenta: false, vendido: false,
    photo: 'https://images.unsplash.com/photo-1502005229762-cf9565b9ebea?w=400&h=300&fit=crop' 
  },
  { 
    id: '2', lat: 40.4180, lng: -3.7050, 
    direccion: 'Gran Vía 45', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'Inmatriculado', localidadId: '111', 
    denominacion_principal: 'Catedral de la Almudena', 
    direccion_normalizada: 'Gran Vía, 45', 
    es_bic: true, enVenta: false, vendido: false,
    photo: 'https://images.unsplash.com/photo-1503315082122-21e2e37b8f7c?w=400&h=300&fit=crop' 
  },
  { 
    id: '3', lat: 40.4175, lng: -3.7042, 
    direccion: 'Plaza Mayor 1', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'En venta', localidadId: '111', 
    denominacion_principal: 'Convento de las Descalzas', 
    direccion_normalizada: 'Plaza Mayor, 1', 
    es_bic: false, enVenta: true, vendido: false,
    photo: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop' 
  },
  { 
    id: '4', lat: 40.4190, lng: -3.7060, 
    direccion: 'Calle de Alcalá 200', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'Vendido', localidadId: '111', 
    denominacion_principal: 'Palacio Episcopal', 
    direccion_normalizada: 'Calle de Alcalá, 200', 
    es_bic: true, enVenta: false, vendido: true,
    photo: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&h=300&fit=crop' 
  },
  { 
    id: '5', lat: 40.4150, lng: -3.7020, 
    direccion: 'Calle de Toledo 50', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'Inmatriculado', localidadId: '111', 
    denominacion_principal: 'Ermita de San Isidro', 
    direccion_normalizada: 'Calle de Toledo, 50', 
    es_bic: false, enVenta: false, vendido: false,
    photo: 'https://images.unsplash.com/photo-1519925610903-381054cc2a1c?w=400&h=300&fit=crop' 
  },
  { 
    id: '6', lat: 40.4200, lng: -3.7070, 
    direccion: 'Paseo del Prado 8', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'BIC', localidadId: '111', 
    denominacion_principal: 'Basílica de San Francisco el Grande', 
    direccion_normalizada: 'Paseo del Prado, 8', 
    es_bic: true, enVenta: false, vendido: false,
    photo: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=400&h=300&fit=crop' 
  }
]

export const printMockStats = () => {
  console.log('📊 Mocks cargados - Inmuebles:', mockInmuebles.length)
  console.log('🏛️  Estados disponibles:', ESTADOS_INMUEBLE.map(e => e.label))
}

// Ejecutar al cargar el módulo
printMockStats()