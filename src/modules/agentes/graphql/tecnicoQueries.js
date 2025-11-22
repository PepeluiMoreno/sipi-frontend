import { gql } from '@apollo/client/core'

export const LISTAR_TECNICOS = gql`
  query ListarTecnicos($filters: TecnicoFilters, $pagination: PaginationInput) {
    tecnicos(filters: $filters, pagination: $pagination) {
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
        rolTecnicoId
        rolTecnico {
          id
          nombre
        }
        colegioProfesionalId
        colegioProfesional {
          id
          nombre
        }
        numeroColegiado
        fechaColegiacion
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

export const OBTENER_TECNICO = gql`
  query ObtenerTecnico($id: ID!) {
    tecnico(id: $id) {
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
        rolTecnicoId
        rolTecnico {
          id
          nombre
        }
        colegioProfesionalId
        colegioProfesional {
          id
          nombre
        }
        numeroColegiado
        fechaColegiacion
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_TECNICO = gql`
  mutation CrearTecnico($input: TecnicoInput!) {
    crearTecnico(input: $input) {
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

export const ACTUALIZAR_TECNICO = gql`
  mutation ActualizarTecnico($id: ID!, $input: TecnicoInput!) {
    actualizarTecnico(id: $id, input: $input) {
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

export const ELIMINAR_TECNICO = gql`
  mutation EliminarTecnico($id: ID!) {
    eliminarTecnico(id: $id) {
      success
      message
    }
  }
`