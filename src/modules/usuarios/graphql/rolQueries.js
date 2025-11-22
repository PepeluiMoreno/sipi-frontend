import { gql } from '@apollo/client/core'

export const LISTAR_ROLES = gql`
  query ListarRoles($filters: RolFilters, $pagination: PaginationInput) {
    roles(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        descripcion
        permisos
        usuarios_count
        created_at
        updated_at
      }
      total
      totalPages
      page
      pageSize
    }
  }
`

export const OBTENER_ROL = gql`
  query ObtenerRol($id: ID!) {
    rol(id: $id) {
      item {
        id
        nombre
        descripcion
        permisos
        usuarios {
          id
          nombre
          apellidos
          email
          nombre_usuario
        }
        created_at
        updated_at
      }
    }
  }
`

export const CREAR_ROL = gql`
  mutation CrearRol($input: RolInput!) {
    crearRol(input: $input) {
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

export const ACTUALIZAR_ROL = gql`
  mutation ActualizarRol($id: ID!, $input: RolInput!) {
    actualizarRol(id: $id, input: $input) {
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

export const ELIMINAR_ROL = gql`
  mutation EliminarRol($id: ID!) {
    eliminarRol(id: $id) {
      success
      message
    }
  }
`