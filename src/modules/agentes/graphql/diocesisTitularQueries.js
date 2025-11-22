import { gql } from '@apollo/client/core'

export const LISTAR_DIOCESIS_TITULARES = gql`
  query ListarDiocesisTitulares($diocesisId: ID!, $orderBy: [String!]) {
    diocesisTitulares(diocesisId: $diocesisId, orderBy: $orderBy) {
      items {
        id
        diocesisId
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

export const OBTENER_DIOCESIS_TITULAR = gql`
  query ObtenerDiocesisTitular($id: ID!) {
    diocesisTitular(id: $id) {
      item {
        id
        diocesisId
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

export const CREAR_DIOCESIS_TITULAR = gql`
  mutation CrearDiocesisTitular($diocesisId: ID!, $input: TitularInput!) {
    crearDiocesisTitular(diocesisId: $diocesisId, input: $input) {
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

export const ACTUALIZAR_DIOCESIS_TITULAR = gql`
  mutation ActualizarDiocesisTitular($id: ID!, $input: TitularInput!) {
    actualizarDiocesisTitular(id: $id, input: $input) {
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

export const ELIMINAR_DIOCESIS_TITULAR = gql`
  mutation EliminarDiocesisTitular($id: ID!) {
    eliminarDiocesisTitular(id: $id) {
      success
      message
    }
  }
`