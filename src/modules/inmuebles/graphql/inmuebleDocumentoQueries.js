// modules/inmuebles/graphql/inmuebleDocumentoQueries.js
import { gql } from '@apollo/client/core'

export const LISTAR_DOCUMENTOS = gql`
  query ListarDocumentos(
    $inmuebleId: ID!
    $filters: DocumentoFilters
    $orderBy: [String!]
  ) {
    inmuebleDocumentos(inmuebleId: $inmuebleId, filters: $filters, orderBy: $orderBy) {
      items {
        id
        inmuebleId
        titulo
        tipo
        descripcion
        fechaDocumento
        url
        fileName
        fileSize
        mimeType
        createdAt
        updatedAt
      }
    }
  }
`

export const OBTENER_DOCUMENTO = gql`
  query ObtenerDocumento($id: ID!) {
    inmuebleDocumento(id: $id) {
      item {
        id
        inmuebleId
        titulo
        tipo
        descripcion
        fechaDocumento
        url
        fileName
        fileSize
        mimeType
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_DOCUMENTO = gql`
  mutation CrearDocumento($inmuebleId: ID!, $input: DocumentoInput!) {
    crearInmuebleDocumento(inmuebleId: $inmuebleId, input: $input) {
      success
      item {
        id
        titulo
        tipo
        fechaDocumento
        url
      }
      message
    }
  }
`

export const ACTUALIZAR_DOCUMENTO = gql`
  mutation ActualizarDocumento($id: ID!, $input: DocumentoInput!) {
    actualizarInmuebleDocumento(id: $id, input: $input) {
      success
      item {
        id
        titulo
        tipo
        fechaDocumento
        url
      }
      message
    }
  }
`

export const ELIMINAR_DOCUMENTO = gql`
  mutation EliminarDocumento($id: ID!) {
    eliminarInmuebleDocumento(id: $id) {
      success
      message
    }
  }
`