import { gql } from '@apollo/client/core'

export const LISTAR_ADMINISTRACIONES = gql`
  query ListarAdministraciones($filters: AdministracionFilters, $pagination: PaginationInput) {
    administraciones(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        ambito
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
            comunidadAutonoma {
              id
              nombre
            }
          }
        }
        comunidadAutonomaId
        provinciaId
        titulares {
          id
          fechaInicio
          fechaFin
          cargo
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

export const OBTENER_ADMINISTRACION = gql`
  query ObtenerAdministracion($id: ID!) {
    administracion(id: $id) {
      item {
        id
        nombre
        ambito
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
            comunidadAutonoma {
              id
              nombre
            }
          }
        }
        comunidadAutonomaId
        provinciaId
        titulares {
          id
          fechaInicio
          fechaFin
          cargo
        }
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ADMINISTRACION = gql`
  mutation CrearAdministracion($input: AdministracionInput!) {
    crearAdministracion(input: $input) {
      success
      item {
        id
        nombre
        ambito
      }
      message
    }
  }
`

export const ACTUALIZAR_ADMINISTRACION = gql`
  mutation ActualizarAdministracion($id: ID!, $input: AdministracionInput!) {
    actualizarAdministracion(id: $id, input: $input) {
      success
      item {
        id
        nombre
        ambito
      }
      message
    }
  }
`

export const ELIMINAR_ADMINISTRACION = gql`
  mutation EliminarAdministracion($id: ID!) {
    eliminarAdministracion(id: $id) {
      success
      message
    }
  }
`