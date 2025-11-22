import { gql } from '@apollo/client/core'

export const LISTAR_DOCUMENTOS = gql`
  query ListarDocumentos($filters: DocumentoFilters, $pagination: PaginationInput) {
    documentos(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        descripcion
        tipoDocumentoId
        tipoDocumento {
          id
          nombre
        }
        tipoLicenciaId
        tipoLicencia {
          id
          nombre
        }
        fuenteDocumentalId
        fuenteDocumental {
          id
          nombre
        }
        contenido
        mimeType
        tamaño
        fechaDocumento
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

export const OBTENER_DOCUMENTO = gql`
  query ObtenerDocumento($id: ID!) {
    documento(id: $id) {
      item {
        id
        nombre
        descripcion
        tipoDocumentoId
        tipoDocumento {
          id
          nombre
        }
        tipoLicenciaId
        tipoLicencia {
          id
          nombre
        }
        fuenteDocumentalId
        fuenteDocumental {
          id
          nombre
        }
        contenido
        mimeType
        tamaño
        fechaDocumento
        inmuebles {
          id
          inmuebleId
          descripcion
          inmueble {
            id
            nombre
          }
        }
        actuaciones {
          id
          actuacionId
          descripcion
          actuacion {
            id
            nombre
          }
        }
        transmisiones {
          id
          transmisionId
          descripcion
          transmision {
            id
            fechaTransmision
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_DOCUMENTO = gql`
  mutation CrearDocumento($input: DocumentoInput!) {
    crearDocumento(input: $input) {
      success
      item {
        id
        nombre
        tipoDocumentoId
        mimeType
        tamaño
      }
      message
    }
  }
`

export const ACTUALIZAR_DOCUMENTO = gql`
  mutation ActualizarDocumento($id: ID!, $input: DocumentoInput!) {
    actualizarDocumento(id: $id, input: $input) {
      success
      item {
        id
        nombre
        tipoDocumentoId
      }
      message
    }
  }
`

export const ELIMINAR_DOCUMENTO = gql`
  mutation EliminarDocumento($id: ID!) {
    eliminarDocumento(id: $id) {
      success
      message
    }
  }
`