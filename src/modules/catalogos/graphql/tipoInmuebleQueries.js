import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_INMUEBLE = gql`
  query ListarTiposInmueble($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposInmueble(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_INMUEBLE = gql`
  query ObtenerTipoInmueble($id: ID!) {
    tipoInmueble(id: $id) {
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

export const CREAR_TIPO_INMUEBLE = gql`
  mutation CrearTipoInmueble($input: CatalogoSimpleInput!) {
    crearTipoInmueble(input: $input) {
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

export const ACTUALIZAR_TIPO_INMUEBLE = gql`
  mutation ActualizarTipoInmueble($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoInmueble(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_INMUEBLE = gql`
  mutation EliminarTipoInmueble($id: ID!) {
    eliminarTipoInmueble(id: $id) {
      success
      message
    }
  }
`