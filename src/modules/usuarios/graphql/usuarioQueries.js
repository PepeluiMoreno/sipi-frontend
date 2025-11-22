import { gql } from '@apollo/client/core'

export const LISTAR_USUARIOS = gql`
  query ListarUsuarios($filters: UsuarioFilters, $pagination: PaginationInput) {
    usuarios(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        apellidos
        nombre_usuario
        email
        email_verificado
        telefono
        direccion
        avatar
        roles {
          id
          nombre
          descripcion
        }
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

export const OBTENER_USUARIO = gql`
  query ObtenerUsuario($id: ID!) {
    usuario(id: $id) {
      item {
        id
        nombre
        apellidos
        nombre_usuario
        email
        email_verificado
        telefono
        direccion
        avatar
        roles {
          id
          nombre
          descripcion
          permisos
        }
        created_at
        updated_at
      }
    }
  }
`

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UsuarioInput!) {
    crearUsuario(input: $input) {
      success
      item {
        id
        nombre
        apellidos
        nombre_usuario
        email
      }
      message
    }
  }
`

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $input: UsuarioInput!) {
    actualizarUsuario(id: $id, input: $input) {
      success
      item {
        id
        nombre
        apellidos
        nombre_usuario
        email
        email_verificado
      }
      message
    }
  }
`

export const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id) {
      success
      message
    }
  }
`

export const ASIGNAR_ROLES_USUARIO = gql`
  mutation AsignarRolesUsuario($usuarioId: ID!, $rolesIds: [ID!]!) {
    asignarRolesUsuario(usuarioId: $usuarioId, rolesIds: $rolesIds) {
      success
      item {
        id
        roles {
          id
          nombre
        }
      }
      message
    }
  }
`

export const ACTUALIZAR_AVATAR = gql`
  mutation ActualizarAvatar($usuarioId: ID!, $avatar: String!) {
    actualizarAvatar(usuarioId: $usuarioId, avatar: $avatar) {
      success
      item {
        id
        avatar
      }
      message
    }
  }
`

export const REENVIAR_VERIFICACION_EMAIL = gql`
  mutation ReenviarVerificacionEmail($usuarioId: ID!) {
    reenviarVerificacionEmail(usuarioId: $usuarioId) {
      success
      message
    }
  }
`