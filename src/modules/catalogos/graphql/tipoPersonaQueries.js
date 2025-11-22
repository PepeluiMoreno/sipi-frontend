import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_PERSONA = gql`
  query ListarTiposPersona($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposPersona(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_PERSONA = gql`
  query ObtenerTipoPersona($id: ID!) {
    tipoPersona(id: $id) {
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

export const CREAR_TIPO_PERSONA = gql`
  mutation CrearTipoPersona($input: CatalogoSimpleInput!) {
    crearTipoPersona(input: $input) {
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

export const ACTUALIZAR_TIPO_PERSONA = gql`
  mutation ActualizarTipoPersona($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoPersona(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_PERSONA = gql`
  mutation EliminarTipoPersona($id: ID!) {
    eliminarTipoPersona(id: $id) {
      success
      message
    }
  }
`