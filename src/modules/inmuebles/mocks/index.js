// modules/inmuebles/mocks/index.js

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
    id: '1',
    nombre: 'Iglesia de Santa María la Mayor',
    denominacion_principal: 'Iglesia de Santa María la Mayor',
    direccion: 'Plaza Virgen de los Reyes, s/n',
    direccion_normalizada: 'Plaza Virgen de los Reyes, s/n, 41004 Sevilla',
    localidad: { id: '311', nombre: 'Sevilla' },
    provincia: { id: '31', nombre: 'Sevilla' },
    comunidadAutonoma: { id: '3', nombre: 'Andalucía' },
    estado: 'BIC',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 37.3861,
    lng: -5.9929,
    photo: 'https://images.unsplash.com/photo-1502005229762-cf9565b9ebea?w=400&h=300&fit=crop',
    created_at: '2020-05-15T10:30:00Z',
    updated_at: '2024-01-20T14:25:00Z',
    estadoConservacion: 'Excelente',
    tieneCoordenadas: true
  },
  {
    id: '2',
    nombre: 'Ermita de San Saturio',
    denominacion_principal: 'Ermita de San Saturio',
    direccion: 'Paseo de San Saturio',
    direccion_normalizada: 'Paseo de San Saturio, 42002 Soria',
    localidad: { id: '421', nombre: 'Soria' },
    provincia: { id: '42', nombre: 'Soria' },
    comunidadAutonoma: { id: '7', nombre: 'Castilla y León' },
    estado: 'BIC',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 41.7625,
    lng: -2.4683,
    photo: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
    created_at: '2019-08-22T09:15:00Z',
    updated_at: '2023-11-10T16:45:00Z',
    estadoConservacion: 'Bueno',
    tieneCoordenadas: true
  },
  {
    id: '3',
    nombre: 'Iglesia de San Miguel Arcángel',
    denominacion_principal: 'Iglesia de San Miguel Arcángel',
    direccion: 'Plaza de San Miguel, 8',
    direccion_normalizada: 'Plaza de San Miguel, 8, 50001 Zaragoza',
    localidad: { id: '502', nombre: 'Zaragoza' },
    provincia: { id: '50', nombre: 'Zaragoza' },
    comunidadAutonoma: { id: '2', nombre: 'Aragón' },
    estado: 'Vendido',
    es_bic: false,
    enVenta: false,
    vendido: true,
    lat: 41.6561,
    lng: -0.8773,
    photo: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?w=400&h=300&fit=crop',
    created_at: '2018-03-10T14:20:00Z',
    updated_at: '2022-09-15T11:30:00Z',
    estadoConservacion: 'Regular',
    tieneCoordenadas: true
  },
  {
    id: '4',
    nombre: 'Basílica de la Sagrada Familia',
    denominacion_principal: 'Basílica de la Sagrada Familia',
    direccion: 'Carrer de Mallorca, 401',
    direccion_normalizada: 'Carrer de Mallorca, 401, 08013 Barcelona',
    localidad: { id: '211', nombre: 'Barcelona' },
    provincia: { id: '21', nombre: 'Barcelona' },
    comunidadAutonoma: { id: '2', nombre: 'Cataluña' },
    estado: 'BIC',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 41.4036,
    lng: 2.1744,
    photo: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
    created_at: '2021-01-12T08:45:00Z',
    updated_at: '2024-02-01T09:15:00Z',
    estadoConservacion: 'Excelente',
    tieneCoordenadas: true
  },
  {
    id: '5',
    nombre: 'Iglesia de San Nicolás de Bari',
    denominacion_principal: 'Iglesia de San Nicolás de Bari',
    direccion: 'Plaza de San Nicolás, 1',
    direccion_normalizada: 'Plaza de San Nicolás, 1, 46001 Valencia',
    localidad: { id: '461', nombre: 'Valencia' },
    provincia: { id: '46', nombre: 'Valencia' },
    comunidadAutonoma: { id: '10', nombre: 'Comunidad Valenciana' },
    estado: 'En venta',
    es_bic: true,
    enVenta: true,
    vendido: false,
    lat: 39.4740,
    lng: -0.3754,
    photo: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400&h=300&fit=crop',
    created_at: '2020-11-05T16:20:00Z',
    updated_at: '2024-01-28T13:40:00Z',
    estadoConservacion: 'Bueno',
    tieneCoordenadas: true
  },
  {
    id: '6',
    nombre: 'Ermita de la Virgen del Castillo',
    denominacion_principal: 'Ermita de la Virgen del Castillo',
    direccion: 'Cerro del Castillo',
    direccion_normalizada: 'Cerro del Castillo, 13300 Ciudad Real',
    localidad: { id: '131', nombre: 'Ciudad Real' },
    provincia: { id: '13', nombre: 'Ciudad Real' },
    comunidadAutonoma: { id: '8', nombre: 'Castilla-La Mancha' },
    estado: 'No investigado',
    es_bic: false,
    enVenta: false,
    vendido: false,
    lat: 38.9863,
    lng: -3.9296,
    photo: 'https://images.unsplash.com/photo-1542665177-1256d6a8a6b6?w=400&h=300&fit=crop',
    created_at: '2023-02-18T11:10:00Z',
    updated_at: '2023-02-18T11:10:00Z',
    estadoConservacion: 'Malo',
    tieneCoordenadas: false
  },
  {
    id: '7',
    nombre: 'Iglesia de Santa María del Naranco',
    denominacion_principal: 'Iglesia de Santa María del Naranco',
    direccion: 'Monte Naranco',
    direccion_normalizada: 'Monte Naranco, 33012 Oviedo',
    localidad: { id: '331', nombre: 'Oviedo' },
    provincia: { id: '33', nombre: 'Asturias' },
    comunidadAutonoma: { id: '3', nombre: 'Asturias' },
    estado: 'BIC',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 43.3794,
    lng: -5.8653,
    photo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    created_at: '2019-06-30T15:25:00Z',
    updated_at: '2023-12-05T10:15:00Z',
    estadoConservacion: 'Excelente',
    tieneCoordenadas: true
  },
  {
    id: '8',
    nombre: 'Iglesia de San Juan Bautista',
    denominacion_principal: 'Iglesia de San Juan Bautista',
    direccion: 'Calle Real, 45',
    direccion_normalizada: 'Calle Real, 45, 29400 Ronda',
    localidad: { id: '312', nombre: 'Ronda' },
    provincia: { id: '31', nombre: 'Málaga' },
    comunidadAutonoma: { id: '3', nombre: 'Andalucía' },
    estado: 'Vendido',
    es_bic: false,
    enVenta: false,
    vendido: true,
    lat: 36.7420,
    lng: -5.1669,
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    created_at: '2017-09-14T12:30:00Z',
    updated_at: '2021-05-22T14:50:00Z',
    estadoConservacion: 'Regular',
    tieneCoordenadas: true
  },
  {
    id: '9',
    nombre: 'Catedral de Santiago de Compostela',
    denominacion_principal: 'Catedral de Santiago de Compostela',
    direccion: 'Praza do Obradoiro',
    direccion_normalizada: 'Praza do Obradoiro, 15704 Santiago de Compostela',
    localidad: { id: '150', nombre: 'Santiago de Compostela' },
    provincia: { id: '15', nombre: 'A Coruña' },
    comunidadAutonoma: { id: '12', nombre: 'Galicia' },
    estado: 'BIC',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 42.8806,
    lng: -8.5446,
    photo: 'https://images.unsplash.com/photo-1551641501-3e0b51d092ca?w=400&h=300&fit=crop',
    created_at: '2018-12-03T09:45:00Z',
    updated_at: '2024-01-10T16:20:00Z',
    estadoConservacion: 'Excelente',
    tieneCoordenadas: true
  },
  {
    id: '10',
    nombre: 'Iglesia de San Antón',
    denominacion_principal: 'Iglesia de San Antón',
    direccion: 'Calle de Hortaleza, 63',
    direccion_normalizada: 'Calle de Hortaleza, 63, 28004 Madrid',
    localidad: { id: '111', nombre: 'Madrid' },
    provincia: { id: '11', nombre: 'Madrid' },
    comunidadAutonoma: { id: '1', nombre: 'Madrid' },
    estado: 'Inmatriculado',
    es_bic: true,
    enVenta: false,
    vendido: false,
    lat: 40.4236,
    lng: -3.6992,
    photo: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&h=300&fit=crop',
    created_at: '2022-03-22T14:15:00Z',
    updated_at: '2023-10-30T11:05:00Z',
    estadoConservacion: 'Bueno',
    tieneCoordenadas: true
  }
]

// Mocks para relaciones
export const mockActuaciones = [
  {
    id: '1',
    inmuebleId: '1',
    tipo: 'Restauración',
    descripcion: 'Restauración completa de cubiertas y fachada principal',
    fechaInicio: '2018-03-15',
    fechaFin: '2019-11-20',
    estado: 'Completada',
    presupuesto: 450000,
    responsable: 'Junta de Andalucía'
  },
  {
    id: '2',
    inmuebleId: '2',
    tipo: 'Consolidación',
    descripcion: 'Refuerzo de cimientos afectados por humedades',
    fechaInicio: '2022-01-10',
    fechaFin: '2022-06-30',
    estado: 'Completada',
    presupuesto: 120000,
    responsable: 'Diputación de Soria'
  },
  {
    id: '3',
    inmuebleId: '4',
    tipo: 'Restauración',
    descripcion: 'Limpieza y conservación de fachadas',
    fechaInicio: '2023-09-01',
    fechaFin: '2024-01-31',
    estado: 'En curso',
    presupuesto: 280000,
    responsable: 'Arzobispado de Barcelona'
  },
  {
    id: '4',
    inmuebleId: '7',
    tipo: 'Consolidación',
    descripcion: 'Reparación de filtraciones en cubierta',
    fechaInicio: '2023-11-15',
    fechaFin: null,
    estado: 'En curso',
    presupuesto: 75000,
    responsable: 'Gobierno del Principado de Asturias'
  }
]

export const mockTransmisiones = [
  {
    id: '1',
    inmuebleId: '3',
    tipoTransmision: 'Venta',
    fechaTransmision: '2022-08-10',
    transmitente: 'Arzobispado de Zaragoza',
    adquirente: 'Fundación Cultural Aragonesa',
    precio: 850000,
    estado: 'Completada'
  },
  {
    id: '2',
    inmuebleId: '8',
    tipoTransmision: 'Venta',
    fechaTransmision: '2021-04-22',
    transmitente: 'Diócesis de Málaga',
    adquirente: 'Hotel Boutique Ronda S.L.',
    precio: 1200000,
    estado: 'Completada'
  },
  {
    id: '3',
    inmuebleId: '5',
    tipoTransmision: 'Oferta de venta',
    fechaTransmision: '2024-01-15',
    transmitente: 'Arzobispado de Valencia',
    adquirente: null,
    precio: 950000,
    estado: 'En trámite'
  }
]

export const mockComunidades = [
  { id: '1', nombre: 'Madrid' },
  { id: '2', nombre: 'Cataluña' },
  { id: '3', nombre: 'Andalucía' },
  { id: '4', nombre: 'Canarias' },
  { id: '5', nombre: 'Comunidad Valenciana' },
  { id: '6', nombre: 'Galicia' },
  { id: '7', nombre: 'Castilla y León' },
  { id: '8', nombre: 'Castilla-La Mancha' },
  { id: '9', nombre: 'País Vasco' },
  { id: '10', nombre: 'Aragón' },
  { id: '11', nombre: 'Extremadura' },
  { id: '12', nombre: 'Asturias' },
  { id: '13', nombre: 'Navarra' },
  { id: '14', nombre: 'Murcia' },
  { id: '15', nombre: 'Cantabria' },
  { id: '16', nombre: 'La Rioja' },
  { id: '17', nombre: 'Islas Baleares' }
]

export const mockProvincias = {
  '1': [{ id: '11', nombre: 'Madrid' }],
  '2': [
    { id: '21', nombre: 'Barcelona' },
    { id: '22', nombre: 'Girona' },
    { id: '23', nombre: 'Lleida' },
    { id: '24', nombre: 'Tarragona' }
  ],
  '3': [
    { id: '31', nombre: 'Sevilla' },
    { id: '32', nombre: 'Málaga' },
    { id: '33', nombre: 'Cádiz' },
    { id: '34', nombre: 'Granada' }
  ],
  '10': [
    { id: '46', nombre: 'Valencia' },
    { id: '47', nombre: 'Alicante' },
    { id: '48', nombre: 'Castellón' }
  ],
  '7': [
    { id: '42', nombre: 'Soria' },
    { id: '43', nombre: 'Burgos' },
    { id: '44', nombre: 'León' }
  ],
  '12': [
    { id: '33', nombre: 'Asturias' }
  ],
  '8': [
    { id: '13', nombre: 'Ciudad Real' },
    { id: '14', nombre: 'Toledo' }
  ],
  '6': [
    { id: '15', nombre: 'A Coruña' },
    { id: '16', nombre: 'Lugo' }
  ]
}

export const mockLocalidades = {
  '11': [{ id: '111', nombre: 'Madrid' }],
  '21': [{ id: '211', nombre: 'Barcelona' }], 
  '31': [
    { id: '311', nombre: 'Sevilla' },
    { id: '312', nombre: 'Ronda' }
  ],
  '32': [{ id: '321', nombre: 'Málaga' }],
  '42': [{ id: '421', nombre: 'Soria' }],
  '46': [{ id: '461', nombre: 'Valencia' }],
  '50': [{ id: '502', nombre: 'Zaragoza' }],
  '33': [{ id: '331', nombre: 'Oviedo' }],
  '13': [{ id: '131', nombre: 'Ciudad Real' }],
  '15': [{ id: '150', nombre: 'Santiago de Compostela' }]
}

// Función de utilidad para estadísticas
export const printMockStats = () => {
  const totalInmuebles = mockInmuebles.length
  const inmatriculados = mockInmuebles.filter(p => p.estado === 'Inmatriculado').length
  const vendidos = mockInmuebles.filter(p => p.estado === 'Vendido').length
  const enVenta = mockInmuebles.filter(p => p.estado === 'En venta').length
  const bic = mockInmuebles.filter(p => p.es_bic).length
  const conFoto = mockInmuebles.filter(p => p.photo).length
  const conCoordenadas = mockInmuebles.filter(p => p.tieneCoordenadas).length

  console.log(`📊 Estadísticas de Inmuebles Mock:
  • Total inmuebles: ${totalInmuebles}
  • Inmatriculados: ${inmatriculados}
  • Vendidos: ${vendidos}
  • En venta: ${enVenta}
  • BIC: ${bic}
  • Con foto: ${conFoto}
  • Con coordenadas: ${conCoordenadas}
  • Actuaciones registradas: ${mockActuaciones.length}
  • Transmisiones registradas: ${mockTransmisiones.length}
  `)
}

// Funciones auxiliares para obtener datos relacionados
export const getActuacionesByInmueble = (inmuebleId) => {
  return mockActuaciones.filter(a => a.inmuebleId === inmuebleId)
}

export const getTransmisionesByInmueble = (inmuebleId) => {
  return mockTransmisiones.filter(t => t.inmuebleId === inmuebleId)
}

export const getInmuebleById = (id) => {
  return mockInmuebles.find(inmueble => inmueble.id === id)
}

export default {
  ESTADOS_INMUEBLE,
  ESTADO_MAPEO,
  mockInmuebles,
  mockActuaciones,
  mockTransmisiones,
  mockComunidades,
  mockProvincias,
  mockLocalidades,
  printMockStats,
  getActuacionesByInmueble,
  getTransmisionesByInmueble,
  getInmuebleById
}