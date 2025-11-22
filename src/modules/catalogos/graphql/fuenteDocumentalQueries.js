import { gql } from '@apollo/client/core'

export const LISTAR_FUENTES_DOCUMENTALES = gql`
  query ListarFuentesDocumentales($filters: FuenteDocumentalFilters, $pagination: PaginationInput) {
    fuentesDocumentales(filters: $filters, pagination: $pagination) {
      items {
        id
        codigo
        nombre
        descripcion
        urlFuente
        esExterna
        requiereUrlExterna
        permiteMetadataExtra
        licenciaPredeterminadaId
        categoria
        soportaSincronizacion
        frecuenciaSyncDias
        apiEndpoint
        requiereAutenticacion
        icono
        colorHex
        orden
        activa
        createdAt
        updatedAt
      }
      total
      totalPages
      page
      pageSize
    }
  }
`

export const OBTENER_FUENTE_DOCUMENTAL = gql`
  query ObtenerFuenteDocumental($id: ID!) {
    fuenteDocumental(id: $id) {
      item {
        id
        codigo
        nombre
        descripcion
        urlFuente
        esExterna
        requiereUrlExterna
        permiteMetadataExtra
        licenciaPredeterminadaId
        categoria
        soportaSincronizacion
        frecuenciaSyncDias
        apiEndpoint
        requiereAutenticacion
        icono
        colorHex
        orden
        activa
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_FUENTE_DOCUMENTAL = gql`
  mutation CrearFuenteDocumental($input: FuenteDocumentalInput!) {
    crearFuenteDocumental(input: $input) {
      success
      item {
        id
        codigo
        nombre
      }
      message
    }
  }
`

export const ACTUALIZAR_FUENTE_DOCUMENTAL = gql`
  mutation ActualizarFuenteDocumental($id: ID!, $input: FuenteDocumentalInput!) {
    actualizarFuenteDocumental(id: $id, input: $input) {
      success
      item {
        id
        codigo
        nombre
      }
      message
    }
  }
`

export const ELIMINAR_FUENTE_DOCUMENTAL = gql`
  mutation EliminarFuenteDocumental($id: ID!) {
    eliminarFuenteDocumental(id: $id) {
      success
      message
    }
  }
`