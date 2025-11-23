// src/modules/usuarios/graphql/usuarioQueries.js

import { gql } from '@apollo/client/core'

// ==================== QUERIES DE USUARIOS ====================

export const LISTAR_USUARIOS = gql`
  query ListarUsuarios($filters: UsuarioFilters, $pagination: PaginationInput) {
    usuarios(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        email
        emailVerificado
        rolId
        rol {
          id
          nombre
          permisos
        }
        foto
        activo
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

export const OBTENER_USUARIO = gql`
  query ObtenerUsuario($id: ID!) {
    usuario(id: $id) {
      item {
        id
        nombre
        email
        emailVerificado
        rolId
        rol {
          id
          nombre
          permisos
        }
        foto
        activo
        createdAt
        updatedAt
      }
    }
  }
`

export const OBTENER_USUARIO_POR_EMAIL = gql`
  query ObtenerUsuarioPorEmail($email: String!) {
    usuarioPorEmail(email: $email) {
      item {
        id
        nombre
        email
        emailVerificado
        rolId
        rol {
          id
          nombre
          permisos
        }
        foto
        activo
        createdAt
        updatedAt
      }
    }
  }
`

// ==================== QUERIES DE ROLES ====================

export const LISTAR_ROLES = gql`
  query ListarRoles($pagination: PaginationInput) {
    roles(pagination: $pagination) {
      items {
        id
        nombre
        descripcion
        permisos
        activo
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

export const OBTENER_ROL = gql`
  query ObtenerRol($id: ID!) {
    rol(id: $id) {
      item {
        id
        nombre
        descripcion
        permisos
        activo
        createdAt
        updatedAt
      }
    }
  }
`

// ==================== MUTACIONES DE USUARIOS ====================

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UsuarioInput!) {
    crearUsuario(input: $input) {
      success
      item {
        id
        nombre
        email
        rolId
        activo
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
        email
        rolId
        activo
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

export const ACTUALIZAR_PERFIL = gql`
  mutation ActualizarPerfil($input: PerfilInput!) {
    actualizarPerfil(input: $input) {
      success
      item {
        id
        nombre
        email
        foto
      }
      message
    }
  }
`

export const ACTUALIZAR_AVATAR = gql`
  mutation ActualizarAvatar($file: Upload!) {
    actualizarAvatar(file: $file) {
      success
      item {
        id
        foto
      }
      message
    }
  }
`

export const ASIGNAR_ROLES_USUARIO = gql`
  mutation AsignarRolesUsuario($usuarioId: ID!, $rolIds: [ID!]!) {
    asignarRolesUsuario(usuarioId: $usuarioId, rolIds: $rolIds) {
      success
      message
    }
  }
`

// ==================== MUTACIONES DE VERIFICACIÓN ====================

export const VERIFICAR_EMAIL = gql`
  mutation VerificarEmail($token: String!) {
    verificarEmail(token: $token) {
      success
      message
      user {
        id
        email
        emailVerificado
      }
    }
  }
`

export const REENVIAR_VERIFICACION = gql`
  mutation ReenviarVerificacion($email: String!) {
    reenviarVerificacion(email: $email) {
      success
      message
    }
  }
`

// ==================== MUTACIONES DE AUTENTICACIÓN ====================

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        nombre
        email
        rol {
          id
          nombre
          permisos
        }
      }
      success
      message
    }
  }
`

export const REGISTER = gql`
  mutation Register($input: UsuarioInput!) {
    register(input: $input) {
      success
      message
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      success
      message
    }
  }
`