import { gql } from '@apollo/client/core'

export const LISTAR_FIGURAS_PROTECCION = gql`
  query ListarFigurasProteccion($filters: CatalogoSimpleFilters, $pagination: PaginationInput) {
    figurasProteccion(filters: $filters, pagination: $pagination) {
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

export const OBTENER_FIGURA_PROTECCION = gql`
  query ObtenerFiguraProteccion($id: ID!) {
    figuraProteccion(id: $id) {
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

export const CREAR_FIGURA_PROTECCION = gql`
  mutation CrearFiguraProteccion($input: CatalogoSimpleInput!) {
    crearFiguraProteccion(input: $input) {
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

export const ACTUALIZAR_FIGURA_PROTECCION = gql`
  mutation ActualizarFiguraProteccion($id: ID!, $input: CatalogoSimpleInput!) {
    actualizarFiguraProteccion(id: $id, input: $input) {
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

export const ELIMINAR_FIGURA_PROTECCION = gql`
  mutation EliminarFiguraProteccion($id: ID!) {
    eliminarFiguraProteccion(id: $id) {
      success
      message
    }
  }
`