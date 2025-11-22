import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_TRANSMISION = gql`
  query ListarTiposTransmision($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposTransmision(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_TRANSMISION = gql`
  query ObtenerTipoTransmision($id: ID!) {
    tipoTransmision(id: $id) {
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

export const CREAR_TIPO_TRANSMISION = gql`
  mutation CrearTipoTransmision($input: CatalogoSimpleInput!) {
    crearTipoTransmision(input: $input) {
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

export const ACTUALIZAR_TIPO_TRANSMISION = gql`
  mutation ActualizarTipoTransmision($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoTransmision(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_TRANSMISION = gql`
  mutation EliminarTipoTransmision($id: ID!) {
    eliminarTipoTransmision(id: $id) {
      success
      message
    }
  }
`