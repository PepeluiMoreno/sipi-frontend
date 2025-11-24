// modules/inmuebles/graphql/inmuebleTransmisionQueries.js
import { gql } from '@apollo/client/core'

export const LISTAR_TRANSMISIONES = gql`
  query ListarTransmisiones(
    $inmuebleId: ID!
    $filters: TransmisionFilters
    $orderBy: [String!]
  ) {
    inmuebleTransmisiones(inmuebleId: $inmuebleId, filters: $filters, orderBy: $orderBy) {
      items {
        id
        inmuebleId
        tipoTransmision
        fechaTransmision
        transmitente
        adquirente
        documentoId
        estado
        observaciones
        createdAt
        updatedAt
        documento {
          id
          titulo
          tipo
        }
      }
      total
    }
  }
`

export const OBTENER_TRANSMISION = gql`
  query ObtenerTransmision($id: ID!) {
    inmuebleTransmision(id: $id) {
      item {
        id
        inmuebleId
        tipoTransmision
        fechaTransmision
        transmitente
        adquirente
        documentoId
        estado
        observaciones
        createdAt
        updatedAt
        documento {
          id
          titulo
          tipo
          url
        }
        inmueble {
          id
          nombre
        }
      }
    }
  }
`

export const CREAR_TRANSMISION = gql`
  mutation CrearTransmision($inmuebleId: ID!, $input: TransmisionInput!) {
    crearInmuebleTransmision(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        tipoTransmision
        fechaTransmision
        transmitente
        adquirente
        estado
      }
      message
    }
  }
`

export const ACTUALIZAR_TRANSMISION = gql`
  mutation ActualizarTransmision($id: ID!, $input: TransmisionInput!) {
    actualizarInmuebleTransmision(id: $id, input: $input) {
      success
      item {
        id
        tipoTransmision
        fechaTransmision
        transmitente
        adquirente
        estado
      }
      message
    }
  }
`

export const ELIMINAR_TRANSMISION = gql`
  mutation EliminarTransmision($id: ID!) {
    eliminarInmuebleTransmision(id: $id) {
      success
      message
    }
  }
`

export const GENERAR_CEDULA_TRANSMISION = gql`
  mutation GenerarCedulaTransmision($transmisionId: ID!) {
    generarCedulaTransmision(transmisionId: $transmisionId) {
      success
      documento {
        id
        titulo
        url
      }
      message
    }
  }
`