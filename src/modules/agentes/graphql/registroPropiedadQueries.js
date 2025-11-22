import { gql } from '@apollo/client/core'

export const LISTAR_REGISTROS_PROPIEDAD = gql`
  query ListarRegistrosPropiedad($filters: RegistroPropiedadFilters, $pagination: PaginationInput) {
    registrosPropiedad(filters: $filters, pagination: $pagination) {
      items {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
          provincia {
            id
            nombre
          }
        }
        titulares {
          id
          fechaInicio
          fechaFin
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

export const OBTENER_REGISTRO_PROPIEDAD = gql`
  query ObtenerRegistroPropiedad($id: ID!) {
    registroPropiedad(id: $id) {
      item {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        email
        telefono
        direccion
        codigoPostal
        localidadId
        localidad {
          id
          nombre
          provincia {
            id
            nombre
          }
        }
        titulares {
          id
          fechaInicio
          fechaFin
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_REGISTRO_PROPIEDAD = gql`
  mutation CrearRegistroPropiedad($input: RegistroPropiedadInput!) {
    crearRegistroPropiedad(input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ACTUALIZAR_REGISTRO_PROPIEDAD = gql`
  mutation ActualizarRegistroPropiedad($id: ID!, $input: RegistroPropiedadInput!) {
    actualizarRegistroPropiedad(id: $id, input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ELIMINAR_REGISTRO_PROPIEDAD = gql`
  mutation EliminarRegistroPropiedad($id: ID!) {
    eliminarRegistroPropiedad(id: $id) {
      success
      message
    }
  }
`