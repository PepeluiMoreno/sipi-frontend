// modules/inmuebles/graphql/inmuebleActuacionQueries.js
import { gql } from '@apollo/client/core'

export const LISTAR_ACTUACIONES = gql`
  query ListarActuaciones(
    $inmuebleId: ID!
    $filters: ActuacionFilters
    $orderBy: [String!]
  ) {
    inmuebleActuaciones(inmuebleId: $inmuebleId, filters: $filters, orderBy: $orderBy) {
      items {
        id
        inmuebleId
        tipo
        descripcion
        fechaInicio
        fechaFin
        estado
        presupuesto
        responsable
        observaciones
        createdAt
        updatedAt
      }
    }
  }
`

export const OBTENER_ACTUACION = gql`
  query ObtenerActuacion($id: ID!) {
    inmuebleActuacion(id: $id) {
      item {
        id
        inmuebleId
        tipo
        descripcion
        fechaInicio
        fechaFin
        estado
        presupuesto
        responsable
        observaciones
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ACTUACION = gql`
  mutation CrearActuacion($inmuebleId: ID!, $input: ActuacionInput!) {
    crearInmuebleActuacion(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        tipo
        descripcion
        fechaInicio
        estado
      }
      message
    }
  }
`

export const ACTUALIZAR_ACTUACION = gql`
  mutation ActualizarActuacion($id: ID!, $input: ActuacionInput!) {
    actualizarInmuebleActuacion(id: $id, input: $input) {
      success
      item {
        id
        tipo
        descripcion
        fechaInicio
        estado
      }
      message
    }
  }
`

export const ELIMINAR_ACTUACION = gql`
  mutation EliminarActuacion($id: ID!) {
    eliminarInmuebleActuacion(id: $id) {
      success
      message
    }
  }
`