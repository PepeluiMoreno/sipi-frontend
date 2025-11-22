import { gql } from '@apollo/client/core'

export const LISTAR_AGENCIAS_INMOBILIARIAS = gql`
  query ListarAgenciasInmobiliarias($filters: AgenciaInmobiliariaFilters, $pagination: PaginationInput) {
    agenciasInmobiliarias(filters: $filters, pagination: $pagination) {
      items {
        id
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

export const OBTENER_AGENCIA_INMOBILIARIA = gql`
  query ObtenerAgenciaInmobiliaria($id: ID!) {
    agenciaInmobiliaria(id: $id) {
      item {
        id
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
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_AGENCIA_INMOBILIARIA = gql`
  mutation CrearAgenciaInmobiliaria($input: AgenciaInmobiliariaInput!) {
    crearAgenciaInmobiliaria(input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ACTUALIZAR_AGENCIA_INMOBILIARIA = gql`
  mutation ActualizarAgenciaInmobiliaria($id: ID!, $input: AgenciaInmobiliariaInput!) {
    actualizarAgenciaInmobiliaria(id: $id, input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ELIMINAR_AGENCIA_INMOBILIARIA = gql`
  mutation EliminarAgenciaInmobiliaria($id: ID!) {
    eliminarAgenciaInmobiliaria(id: $id) {
      success
      message
    }
  }
`