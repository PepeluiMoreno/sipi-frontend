import { gql } from '@apollo/client/core'

export const LISTAR_ADMINISTRACIONES_TITULARES = gql`
  query ListarAdministracionTitulares($administracionId: ID!, $orderBy: [String!]) {
    administracionTitulares(administracionId: $administracionId, orderBy: $orderBy) {
      items {
        id
        administracionId
        nombre
        cargo
        fechaInicio
        fechaFin
        createdAt
        updatedAt
      }
    }
  }
`

export const OBTENER_ADMINISTRACION_TITULAR = gql`
  query ObtenerAdministracionTitular($id: ID!) {
    administracionTitular(id: $id) {
      item {
        id
        administracionId
        nombre
        cargo
        fechaInicio
        fechaFin
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ADMINISTRACION_TITULAR = gql`
  mutation CrearAdministracionTitular($administracionId: ID!, $input: TitularInput!) {
    crearAdministracionTitular(administracionId: $administracionId, input: $input) {
      success
      item {
        id
        nombre
        cargo
        fechaInicio
      }
      message
    }
  }
`

export const ACTUALIZAR_ADMINISTRACION_TITULAR = gql`
  mutation ActualizarAdministracionTitular($id: ID!, $input: TitularInput!) {
    actualizarAdministracionTitular(id: $id, input: $input) {
      success
      item {
        id
        nombre
        cargo
        fechaInicio
      }
      message
    }
  }
`

export const ELIMINAR_ADMINISTRACION_TITULAR = gql`
  mutation EliminarAdministracionTitular($id: ID!) {
    eliminarAdministracionTitular(id: $id) {
      success
      message
    }
  }
`