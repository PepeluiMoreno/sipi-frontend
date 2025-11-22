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
    photo: 'https://images.unsplash.com/photo-1502005229762-cf9565b9ebea?w=100&h=100&fit=crop' 
  },
  { 
    id: '2', lat: 40.4180, lng: -3.7050, 
    direccion: 'Gran Vía 45', localidad: 'Madrid', provincia: 'Madrid', 
    estado: 'Inmatriculado', localidadId: '111', 
    denominacion_principal: 'Catedral de la Almudena', 
    direccion_normalizada: 'Gran Vía, 45', 
    es_bic: true, enVenta: false, vendido: false,
    photo: 'https://images.unsplash.com/photo-1503315082122-21e2e37b8f7c?w=100&h=100&fit=crop' 
  }
]

export const printMockStats = () => {
  console.log('📊 Mocks cargados - Inmuebles:', mockInmuebles.length)
}