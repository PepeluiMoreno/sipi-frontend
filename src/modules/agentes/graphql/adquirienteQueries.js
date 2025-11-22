import { gql } from '@apollo/client/core'

export const LISTAR_ADQUIRIENTES = gql`
  query ListarAdquirientes($filters: PersonaFilters, $pagination: PaginationInput) {
    adquirientes(filters: $filters, pagination: $pagination) {
      items {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        razonSocial
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

export const OBTENER_ADQUIRIENTE = gql`
  query ObtenerAdquiriente($id: ID!) {
    adquiriente(id: $id) {
      item {
        id
        tipoIdentificacion
        numeroIdentificacion
        nombre
        razonSocial
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
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ADQUIRIENTE = gql`
  mutation CrearAdquiriente($input: PersonaInput!) {
    crearAdquiriente(input: $input) {
      success
      item {
        id
        nombre
        numeroIdentificacion
      }
      message
    }
  }
`

export const ACTUALIZAR_ADQUIRIENTE = gql`
  mutation ActualizarAdquiriente($id: ID!, $input: PersonaInput!) {
    actualizarAdquiriente(id: $id, input: $input) {
      success
      item {
        id
        nombre
        numeroIdentificacion
      }
      message
    }
  }
`

export const ELIMINAR_ADQUIRIENTE = gql`
  mutation EliminarAdquiriente($id: ID!) {
    eliminarAdquiriente(id: $id) {
      success
      message
    }
  }
`