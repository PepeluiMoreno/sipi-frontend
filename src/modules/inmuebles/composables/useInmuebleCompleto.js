// modules/inmuebles/composables/useInmuebleCompleto.js
import { computed } from 'vue'
import {
  useInmueble,
  useInmuebleDenominaciones,
  useInmuebleOSMExt,
  useInmuebleWDExt,
  useInmuebleProteccion,
  useInmuebleDocumentos,
  useInmuebleActuaciones,
  useInmuebleTransmisiones
} from './index.js'

export function useInmuebleCompleto(inmuebleId) {
  // Composables individuales
  const inmuebleAPI = useInmueble()
  const denominacionAPI = useInmuebleDenominaciones(inmuebleId)
  const osmAPI = useInmuebleOSMExt(inmuebleId)
  const wdAPI = useInmuebleWDExt(inmuebleId)
  const proteccionAPI = useInmuebleProteccion(inmuebleId)
  const documentosAPI = useInmuebleDocumentos(inmuebleId)
  const actuacionesAPI = useInmuebleActuaciones(inmuebleId)
  const transmisionesAPI = useInmuebleTransmisiones(inmuebleId)

  // Estados computados unificados
  const loading = computed(() => 
    inmuebleAPI.loading.value ||
    denominacionAPI.loading.value ||
    osmAPI.loading.value ||
    wdAPI.loading.value ||
    proteccionAPI.loading.value ||
    documentosAPI.loading.value ||
    actuacionesAPI.loading.value ||
    transmisionesAPI.loading.value
  )

  const error = computed(() => 
    inmuebleAPI.error.value ||
    denominacionAPI.error.value ||
    osmAPI.error.value ||
    wdAPI.error.value ||
    proteccionAPI.error.value ||
    documentosAPI.error.value ||
    actuacionesAPI.error.value ||
    transmisionesAPI.error.value
  )

  // Cargar todos los datos
  const cargarCompleto = async () => {
    await Promise.all([
      inmuebleAPI.obtener(inmuebleId),
      denominacionAPI.listar(),
      osmAPI.obtener(),
      wdAPI.obtener(),
      proteccionAPI.listar(),
      documentosAPI.listar(),
      actuacionesAPI.listar(),
      transmisionesAPI.listar()
    ])
  }

  // Cargar datos básicos (sin relaciones pesadas)
  const cargarBasico = async () => {
    await Promise.all([
      inmuebleAPI.obtener(inmuebleId),
      denominacionAPI.listar(),
      proteccionAPI.listar()
    ])
  }

  // Sincronizar todos los datos externos
  const sincronizarExternos = async () => {
    await Promise.all([
      osmAPI.sincronizar(),
      wdAPI.sincronizar()
    ])
  }

  // Recargar todas las relaciones
  const recargarRelaciones = async () => {
    await Promise.all([
      denominacionAPI.listar(),
      proteccionAPI.listar(),
      documentosAPI.listar(),
      actuacionesAPI.listar(),
      transmisionesAPI.listar()
    ])
  }

  return {
    // Estados principales
    inmueble: inmuebleAPI.inmueble,
    loading,
    error,
    
    // Estados de relaciones
    denominaciones: denominacionAPI.denominaciones,
    denominacionPrincipal: denominacionAPI.denominacionPrincipal,
    denominacionesAlternativas: denominacionAPI.denominacionesAlternativas,
    osmExt: osmAPI.osmExt,
    wdExt: wdAPI.wdExt,
    figurasProteccion: proteccionAPI.figurasProteccion,
    tieneProteccion: proteccionAPI.tieneProteccion,
    nivelMaximoProteccion: proteccionAPI.nivelMaximoProteccion,
    documentos: documentosAPI.documentos,
    documentosPorTipo: documentosAPI.documentosPorTipo,
    actuaciones: actuacionesAPI.actuaciones,
    actuacionesActivas: actuacionesAPI.actuacionesActivas,
    actuacionesCompletadas: actuacionesAPI.actuacionesCompletadas,
    transmisiones: transmisionesAPI.transmisiones,
    ultimaTransmision: transmisionesAPI.ultimaTransmision,
    transmisionesRecientes: transmisionesAPI.transmisionesRecientes,
    tieneTransmisionesPendientes: transmisionesAPI.tieneTransmisionesPendientes,
    
    // Métodos de inmueble
    obtenerInmueble: inmuebleAPI.obtener,
    actualizarInmueble: inmuebleAPI.actualizar,
    
    // Métodos de denominaciones
    listarDenominaciones: denominacionAPI.listar,
    crearDenominacion: denominacionAPI.crear,
    actualizarDenominacion: denominacionAPI.actualizar,
    eliminarDenominacion: denominacionAPI.eliminar,
    establecerPrincipal: denominacionAPI.establecerPrincipal,
    
    // Métodos OSM
    obtenerOSM: osmAPI.obtener,
    sincronizarOSM: osmAPI.sincronizar,
    
    // Métodos Wikidata
    obtenerWD: wdAPI.obtener,
    sincronizarWD: wdAPI.sincronizar,
    
    // Métodos de protección
    listarProteccion: proteccionAPI.listar,
    crearProteccion: proteccionAPI.crear,
    eliminarProteccion: proteccionAPI.eliminar,
    
    // Métodos de documentos
    listarDocumentos: documentosAPI.listar,
    crearDocumento: documentosAPI.crear,
    eliminarDocumento: documentosAPI.eliminar,
    
    // Métodos de actuaciones
    listarActuaciones: actuacionesAPI.listar,
    crearActuacion: actuacionesAPI.crear,
    eliminarActuacion: actuacionesAPI.eliminar,
    
    // Métodos de transmisiones
    listarTransmisiones: transmisionesAPI.listar,
    crearTransmision: transmisionesAPI.crear,
    eliminarTransmision: transmisionesAPI.eliminar,
    generarCedulaTransmision: transmisionesAPI.generarCedula,
    
    // Métodos combinados
    cargarCompleto,
    cargarBasico,
    sincronizarExternos,
    recargarRelaciones
  }
}