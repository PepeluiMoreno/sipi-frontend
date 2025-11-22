import { gql } from '@apollo/client/core'

export const LISTAR_ESTADOS_TRATAMIENTO = gql`
  query ListarEstadosTratamiento($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    estadosTratamiento(filters: $filters, pagination: $pagination) {
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

export const OBTENER_ESTADO_TRATAMIENTO = gql`
  query ObtenerEstadoTratamiento($id: ID!) {
    estadoTratamiento(id: $id) {
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

export const CREAR_ESTADO_TRATAMIENTO = gql`
  mutation CrearEstadoTratamiento($input: CatalogoSimpleInput!) {
    crearEstadoTratamiento(input: $input) {
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

export const ACTUALIZAR_ESTADO_TRATAMIENTO = gql`
  mutation ActualizarEstadoTratamiento($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarEstadoTratamiento(id: $id, input: $input) {
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

export const ELIMINAR_ESTADO_TRATAMIENTO = gql`
  mutation EliminarEstadoTratamiento($id: ID!) {
    eliminarEstadoTratamiento(id: $id) {
      success
      message
    }
  }
`