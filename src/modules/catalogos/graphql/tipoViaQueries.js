import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_VIA = gql`
  query ListarTiposVia($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposVia(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_VIA = gql`
  query ObtenerTipoVia($id: ID!) {
    tipoVia(id: $id) {
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

export const CREAR_TIPO_VIA = gql`
  mutation CrearTipoVia($input: CatalogoSimpleInput!) {
    crearTipoVia(input: $input) {
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

export const ACTUALIZAR_TIPO_VIA = gql`
  mutation ActualizarTipoVia($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoVia(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_VIA = gql`
  mutation EliminarTipoVia($id: ID!) {
    eliminarTipoVia(id: $id) {
      success
      message
    }
  }
`