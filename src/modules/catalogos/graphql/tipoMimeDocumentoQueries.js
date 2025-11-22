import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_MIME = gql`
  query ListarTiposMime($filters: TipoMimeFilters, $pagination: PaginationInput) {
    tiposMimeDocumento(filters: $filters, pagination: $pagination) {
      items {
        id
        tipoMime
        extension
        descripcion
        createdAt
        updatedAt
      }
      total
    }
  }
`

export const OBTENER_TIPO_MIME = gql`
  query ObtenerTipoMime($id: ID!) {
    tipoMimeDocumento(id: $id) {
      item {
        id
        tipoMime
        extension
        descripcion
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_TIPO_MIME = gql`
  mutation CrearTipoMime($input: TipoMimeInput!) {
    crearTipoMimeDocumento(input: $input) {
      success
      item {
        id
        tipoMime
        extension
        descripcion
      }
      message
    }
  }
`

export const ACTUALIZAR_TIPO_MIME = gql`
  mutation ActualizarTipoMime($id: ID!, $input: TipoMimeInput!) {
    actualizarTipoMimeDocumento(id: $id, input: $input) {
      success
      item {
        id
        tipoMime
        extension
        descripcion
      }
      message
    }
  }
`

export const ELIMINAR_TIPO_MIME = gql`
  mutation EliminarTipoMime($id: ID!) {
    eliminarTipoMimeDocumento(id: $id) {
      success
      message
    }
  }
`