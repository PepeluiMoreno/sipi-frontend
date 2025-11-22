import { gql } from '@apollo/client/core'

export const LISTAR_NOTARIAS = gql`
  query ListarNotarias($filters: NotariaFilters, $pagination: PaginationInput) {
    notarias(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        tipoIdentificacion
        numeroIdentificacion
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

export const OBTENER_NOTARIA = gql`
  query ObtenerNotaria($id: ID!) {
    notaria(id: $id) {
      item {
        id
        nombre
        tipoIdentificacion
        numeroIdentificacion
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

export const CREAR_NOTARIA = gql`
  mutation CrearNotaria($input: NotariaInput!) {
    crearNotaria(input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ACTUALIZAR_NOTARIA = gql`
  mutation ActualizarNotaria($id: ID!, $input: NotariaInput!) {
    actualizarNotaria(id: $id, input: $input) {
      success
      item {
        id
        nombre
      }
      message
    }
  }
`

export const ELIMINAR_NOTARIA = gql`
  mutation EliminarNotaria($id: ID!) {
    eliminarNotaria(id: $id) {
      success
      message
    }
  }
`