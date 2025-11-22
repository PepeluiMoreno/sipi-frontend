import { gql } from '@apollo/client/core'

export const OBTENER_OSM_EXT = gql`
  query ObtenerOSMExt($inmuebleId: ID!) {
    inmuebleOSMExt(inmuebleId: $inmuebleId) {
      item {
        id
        inmuebleId
        osmId
        osmType
        version
        name
        denomination
        diocese
        operator
        heritageStatus
        historic
        ruins
        hasPolygon
        geom
        addressStreet
        addressCity
        addressPostcode
        sourceUpdatedAt
        tags
        raw
        qaFlags
        sourceRefs
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_OSM_EXT = gql`
  mutation CrearOSMExt($inmuebleId: ID!, $input: OSMExtInput!) {
    crearInmuebleOSMExt(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        osmId
        osmType
        name
      }
      message
    }
  }
`

export const ACTUALIZAR_OSM_EXT = gql`
  mutation ActualizarOSMExt($inmuebleId: ID!, $input: OSMExtInput!) {
    actualizarInmuebleOSMExt(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        osmId
        osmType
        name
      }
      message
    }
  }
`

export const ELIMINAR_OSM_EXT = gql`
  mutation EliminarOSMExt($inmuebleId: ID!) {
    eliminarInmuebleOSMExt(inmuebleId: $inmuebleId) {
      success
      message
    }
  }
`

export const SINCRONIZAR_OSM = gql`
  mutation SincronizarOSM($inmuebleId: ID!) {
    sincronizarOSM(inmuebleId: $inmuebleId) {
      success
      item {
        id
        osmId
        osmType
        name
      }
      message
    }
  }
`