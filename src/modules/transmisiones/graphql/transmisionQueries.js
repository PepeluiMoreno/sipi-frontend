import { gql } from '@apollo/client/core'

export const LISTAR_TRANSMISIONES = gql`
  query ListarTransmisiones($filters: TransmisionFilters, $pagination: PaginationInput) {
    transmisiones(filters: $filters, pagination: $pagination) {
      items {
        id
        inmuebleId
        inmueble {
          id
          nombre
          direccionNormalizada
        }
        transmitenteId
        transmitente {
          id
          nombre
          numeroIdentificacion
        }
        adquirienteId
        adquiriente {
          id
          nombre
          numeroIdentificacion
        }
        notariaId
        notaria {
          id
          nombre
        }
        registroPropiedadId
        registroPropiedad {
          id
          nombre
        }
        tipoTransmisionId
        tipoTransmision {
          id
          nombre
        }
        tipoCertificacionPropiedadId
        tipoCertificacionPropiedad {
          id
          nombre
        }
        fechaTransmision
        descripcion
        precioVenta
        anunciantes {
          id
          agenciaInmobiliariaId
          agenciaInmobiliaria {
            id
            nombre
          }
        }
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

export const OBTENER_TRANSMISION = gql`
  query ObtenerTransmision($id: ID!, $conDocumentos: Boolean = false, $conAnunciantes: Boolean = false) {
    transmision(id: $id) {
      item {
        id
        inmuebleId
        inmueble {
          id
          nombre
          direccionNormalizada
        }
        transmitenteId
        transmitente {
          id
          nombre
          numeroIdentificacion
          tipoIdentificacion
        }
        adquirienteId
        adquiriente {
          id
          nombre
          numeroIdentificacion
          tipoIdentificacion
        }
        notariaId
        notaria {
          id
          nombre
          localidad {
            id
            nombre
          }
        }
        registroPropiedadId
        registroPropiedad {
          id
          nombre
          localidad {
            id
            nombre
          }
        }
        tipoTransmisionId
        tipoTransmision {
          id
          nombre
          descripcion
        }
        tipoCertificacionPropiedadId
        tipoCertificacionPropiedad {
          id
          nombre
        }
        fechaTransmision
        descripcion
        precioVenta
        
        documentos @include(if: $conDocumentos) {
          id
          documentoId
          descripcion
          documento {
            id
            nombre
            tipoDocumento {
              id
              nombre
            }
          }
        }
        
        anunciantes @include(if: $conAnunciantes) {
          id
          agenciaInmobiliariaId
          agenciaInmobiliaria {
            id
            nombre
            localidad {
              id
              nombre
            }
          }
        }
        
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_TRANSMISION = gql`
  mutation CrearTransmision($input: TransmisionInput!) {
    crearTransmision(input: $input) {
      success
      item {
        id
        inmuebleId
        fechaTransmision
        precioVenta
      }
      message
    }
  }
`

export const ACTUALIZAR_TRANSMISION = gql`
  mutation ActualizarTransmision($id: ID!, $input: TransmisionInput!) {
    actualizarTransmision(id: $id, input: $input) {
      success
      item {
        id
        inmuebleId
        fechaTransmision
        precioVenta
      }
      message
    }
  }
`

export const ELIMINAR_TRANSMISION = gql`
  mutation EliminarTransmision($id: ID!) {
    eliminarTransmision(id: $id) {
      success
      message
    }
  }
`