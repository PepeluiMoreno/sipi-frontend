import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_DOCUMENTO = gql`
  query ListarTiposDocumento($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposDocumento(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_DOCUMENTO = gql`
  query ObtenerTipoDocumento($id: ID!) {
    tipoDocumento(id: $id) {
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

export const CREAR_TIPO_DOCUMENTO = gql`
  mutation CrearTipoDocumento($input: CatalogoSimpleInput!) {
    crearTipoDocumento(input: $input) {
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

export const ACTUALIZAR_TIPO_DOCUMENTO = gql`
  mutation ActualizarTipoDocumento($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoDocumento(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_DOCUMENTO = gql`
  mutation EliminarTipoDocumento($id: ID!) {
    eliminarTipoDocumento(id: $id) {
      success
      message
    }
  }
`