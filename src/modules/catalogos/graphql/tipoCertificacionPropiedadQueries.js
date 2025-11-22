import { gql } from '@apollo/client/core'

export const LISTAR_TIPOS_CERTIFICACION_PROPIEDAD = gql`
  query ListarTiposCertificacionPropiedad($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    tiposCertificacionPropiedad(filters: $filters, pagination: $pagination) {
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

export const OBTENER_TIPO_CERTIFICACION_PROPIEDAD = gql`
  query ObtenerTipoCertificacionPropiedad($id: ID!) {
    tipoCertificacionPropiedad(id: $id) {
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

export const CREAR_TIPO_CERTIFICACION_PROPIEDAD = gql`
  mutation CrearTipoCertificacionPropiedad($input: CatalogoSimpleInput!) {
    crearTipoCertificacionPropiedad(input: $input) {
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

export const ACTUALIZAR_TIPO_CERTIFICACION_PROPIEDAD = gql`
  mutation ActualizarTipoCertificacionPropiedad($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarTipoCertificacionPropiedad(id: $id, input: $input) {
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

export const ELIMINAR_TIPO_CERTIFICACION_PROPIEDAD = gql`
  mutation EliminarTipoCertificacionPropiedad($id: ID!) {
    eliminarTipoCertificacionPropiedad(id: $id) {
      success
      message
    }
  }
`