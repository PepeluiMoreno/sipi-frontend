import { gql } from '@apollo/client/core'

export const LISTAR_ROLES_TECNICO = gql`
  query ListarRolesTecnico($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    rolesTecnico(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        descripcion
        createdAt
        updatedAt
      }
      total
    }
  }
`

export const OBTENER_ROL_TECNICO = gql`
  query ObtenerRolTecnico($id: ID!) {
    rolTecnico(id: $id) {
      item {
        id
        nombre
        descripcion
        createdAt
        updatedAt
      }
    }
  }
`

export const CREAR_ROL_TECNICO = gql`
  mutation CrearRolTecnico($input: CatalogoSimpleInput!) {
    crearRolTecnico(input: $input) {
      success
      item {
        id
        nombre
        descripcion
      }
      message
    }
  }
`

export const ACTUALIZAR_ROL_TECNICO = gql`
  mutation ActualizarRolTecnico($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarRolTecnico(id: $id, input: $input) {
      success
      item {
        id
        nombre
        descripcion
      }
      message
    }
  }
`

export const ELIMINAR_ROL_TECNICO = gql`
  mutation EliminarRolTecnico($id: ID!) {
    eliminarRolTecnico(id: $id) {
      success
      message
    }
  }
`