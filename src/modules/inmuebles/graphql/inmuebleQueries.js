import { gql } from '@apollo/client/core'

export const LISTAR_DENOMINACIONES = gql`
  query ListarDenominaciones($inmuebleId: ID!, $orderBy: [String!]) {
    inmuebleDenominaciones(inmuebleId: $inmuebleId, orderBy: $orderBy) {
      items {
        id
        inmuebleId
        denominacion
        esPrincipal
        idioma
        fechaInicio
        fechaFin
        createdAt
        updatedAt
      }
    }
  }
`

export const OBTENER_DENOMINACION = gql`
  query ObtenerDenominacion($id: ID!) {
    inmuebleDenominacion(id: $id) {
      item {
        id
        inmuebleId
        denominacion
        esPrincipal
        idioma
        fechaInicio
        fechaFin
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_DENOMINACION = gql`
  mutation CrearDenominacion($inmuebleId: ID!, $input: DenominacionInput!) {
    crearInmuebleDenominacion(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        denominacion
        esPrincipal
        idioma
      }
      message
    }
  }
`

export const ACTUALIZAR_DENOMINACION = gql`
  mutation ActualizarDenominacion($id: ID!, $input: DenominacionInput!) {
    actualizarInmuebleDenominacion(id: $id, input: $input) {
      success
      item {
        id
        denominacion
        esPrincipal
        idioma
      }
      message
    }
  }
`

export const ELIMINAR_DENOMINACION = gql`
  mutation EliminarDenominacion($id: ID!) {
    eliminarInmuebleDenominacion(id: $id) {
      success
      message
    }
  }
`

export const ESTABLECER_PRINCIPAL = gql`
  mutation EstablecerDenominacionPrincipal($inmuebleId: ID!, $denominacionId: ID!) {
    establecerDenominacionPrincipal(inmuebleId: $inmuebleId, denominacionId: $denominacionId) {
      success
      message
    }
  }
`