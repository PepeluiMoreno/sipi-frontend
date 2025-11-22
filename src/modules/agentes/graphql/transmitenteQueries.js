import { gql } from '@apollo/client/core'

export const LISTAR_TRANSMITENTES = gql`
  query ListarTransmitentes($filters: PersonaFilters, $pagination: PaginationInput) {
    transmitentes(filters: $filters, pagination: $pagination) {
      items {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        razonSocial
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
          provincia {
            id
            nombre
          }
        }
        createdAt
        updatedAt
      }
      total
      totalPages
      page
      pageSize
    }
  }
`

export const OBTENER_TRANSMITENTE = gql`
  query ObtenerTransmitente($id: ID!) {
    transmitente(id: $id) {
      item {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        razonSocial
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
          provincia {
            id
            nombre
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_TRANSMITENTE = gql`
  mutation CrearTransmitente($input: PersonaInput!) {
    crearTransmitente(input: $input) {
      success
      item {
        id
        nombre
        numeroIdentificacion
      }
      message
    }
  }
`

export const ACTUALIZAR_TRANSMITENTE = gql`
  mutation ActualizarTransmitente($id: ID!, $input: PersonaInput!) {
    actualizarTransmitente(id: $id, input: $input) {
      success
      item {
        id
        nombre
        numeroIdentificacion
      }
      message
    }
  }
`

export const ELIMINAR_TRANSMITENTE = gql`
  mutation EliminarTransmitente($id: ID!) {
    eliminarTransmitente(id: $id) {
      success
      message
    }
  }
`