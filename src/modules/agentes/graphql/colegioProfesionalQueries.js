import { gql } from '@apollo/client/core'

export const LISTAR_COLEGIOS_PROFESIONALES = gql`
  query ListarColegiosProfesionales($filters: ColegioProfesionalFilters, $pagination: PaginationInput) {
    colegiosProfesionales(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        codigo
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

export const OBTENER_COLEGIO_PROFESIONAL = gql`
  query ObtenerColegioProfesional($id: ID!) {
    colegioProfesional(id: $id) {
      item {
        id
        nombre
        codigo
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

export const CREAR_COLEGIO_PROFESIONAL = gql`
  mutation CrearColegioProfesional($input: ColegioProfesionalInput!) {
    crearColegioProfesional(input: $input) {
      success
      item {
        id
        nombre
        codigo
      }
      message
    }
  }
`

export const ACTUALIZAR_COLEGIO_PROFESIONAL = gql`
  mutation ActualizarColegioProfesional($id: ID!, $input: ColegioProfesionalInput!) {
    actualizarColegioProfesional(id: $id, input: $input) {
      success
      item {
        id
        nombre
        codigo
      }
      message
    }
  }
`

export const ELIMINAR_COLEGIO_PROFESIONAL = gql`
  mutation EliminarColegioProfesional($id: ID!) {
    eliminarColegioProfesional(id: $id) {
      success
      message
    }
  }
`