import { gql } from '@apollo/client/core'

export const LISTAR_ESTADOS_CONSERVACION = gql`
  query ListarEstadosConservacion($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    estadosConservacion(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        descripcion
        createdAt
        updatedAt
      }
      total
    }
  }
`

export const OBTENER_ESTADO_CONSERVACION = gql`
  query ObtenerEstadoConservacion($id: ID!) {
    estadoConservacion(id: $id) {
      item {
        id
        nombre
        descripcion
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ESTADO_CONSERVACION = gql`
  mutation CrearEstadoConservacion($input: CatalogoSimpleInput!) {
    crearEstadoConservacion(input: $input) {
      success
      item {
        id
        nombre
        descripcion
      }
      message
    }
  }
`

export const ACTUALIZAR_ESTADO_CONSERVACION = gql`
  mutation ActualizarEstadoConservacion($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarEstadoConservacion(id: $id, input: $input) {
      success
      item {
        id
        nombre
        descripcion
      }
      message
    }
  }
`

export const ELIMINAR_ESTADO_CONSERVACION = gql`
  mutation EliminarEstadoConservacion($id: ID!) {
    eliminarEstadoConservacion(id: $id) {
      success
      message
    }
  }
`