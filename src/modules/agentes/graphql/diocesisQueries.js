import { gql } from '@apollo/client/core'

export const LISTAR_DIOCESIS = gql`
  query ListarDiocesis($filters: DiocesisFilters, $pagination: PaginationInput) {
    diocesis(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        wikidataQid
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
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

export const OBTENER_DIOCESIS = gql`
  query ObtenerDiocesis($id: ID!, $conTitulares: Boolean = false) {
    diocesis(id: $id) {
      item {
        id
        nombre
        wikidataQid
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
        }
        titulares @include(if: $conTitulares) {
          id
          fechaInicio
          fechaFin
          cargo
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_DIOCESIS = gql`
  mutation CrearDiocesis($input: DiocesisInput!) {
    crearDiocesis(input: $input) {
      success
      item {
        id
        nombre
        wikidataQid
      }
      message
    }
  }
`

export const ACTUALIZAR_DIOCESIS = gql`
  mutation ActualizarDiocesis($id: ID!, $input: DiocesisInput!) {
    actualizarDiocesis(id: $id, input: $input) {
      success
      item {
        id
        nombre
        wikidataQid
      }
      message
    }
  }
`

export const ELIMINAR_DIOCESIS = gql`
  mutation EliminarDiocesis($id: ID!) {
    eliminarDiocesis(id: $id) {
      success
      message
    }
  }
`