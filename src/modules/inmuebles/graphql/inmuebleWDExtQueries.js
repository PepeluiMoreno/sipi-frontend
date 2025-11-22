import { gql } from '@apollo/client/core'

export const OBTENER_WD_EXT = gql`
  query ObtenerWDExt($inmuebleId: ID!) {
    inmuebleWDExt(inmuebleId: $inmuebleId) {
      item {
        id
        inmuebleId
        wikidataQid
        commonsCategory
        inception
        sourceUpdatedAt
        claims
        sitelinks
        raw
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_WD_EXT = gql`
  mutation CrearWDExt($inmuebleId: ID!, $input: WDExtInput!) {
    crearInmuebleWDExt(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        wikidataQid
        commonsCategory
      }
      message
    }
  }
`

export const ACTUALIZAR_WD_EXT = gql`
  mutation ActualizarWDExt($inmuebleId: ID!, $input: WDExtInput!) {
    actualizarInmuebleWDExt(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        wikidataQid
        commonsCategory
      }
      message
    }
  }
`

export const ELIMINAR_WD_EXT = gql`
  mutation EliminarWDExt($inmuebleId: ID!) {
    eliminarInmuebleWDExt(inmuebleId: $inmuebleId) {
      success
      message
    }
  }
`

export const SINCRONIZAR_WD = gql`
  mutation SincronizarWikidata($inmuebleId: ID!) {
    sincronizarWikidata(inmuebleId: $inmuebleId) {
      success
      item {
        id
        wikidataQid
        commonsCategory
      }
      message
    }
  }
`