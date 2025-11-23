import gql from 'graphql-tag'

// Fragmento con campos comunes
const NOTARIA_BASE_FRAGMENT = gql`
  fragment NotariaBase on Notaria {
    id
    nombre
    nombreNotario
    numeroIdentificacion
    email
    telefono
    direccion
    codigoPostal
    localidad {
      id
      nombre
      provincia {
        id
        nombre
      }
    }
    colegioProfesional {
      id
      nombre
    }
    titulares {
      id
      nombre
      apellidos
      fechaInicio
      fechaFin
    }
    createdAt
    updatedAt
  }
`

// Listar notarías con paginación y filtros
export const LISTAR_NOTARIAS = gql`
  query ListarNotarias($filters: NotariaFiltersInput, $pagination: PaginationInput) {
    notarias(filters: $filters, pagination: $pagination) {
      items {
        ...NotariaBase
      }
      total
      totalPages
      page
      pageSize
    }
  }
  ${NOTARIA_BASE_FRAGMENT}
`

// Obtener una notaria por ID
export const OBTENER_NOTARIA = gql`
  query ObtenerNotaria($id: ID!) {
    notaria(id: $id) {
      item {
        ...NotariaBase
      }
    }
  }
  ${NOTARIA_BASE_FRAGMENT}
`

// Crear nueva notaría
export const CREAR_NOTARIA = gql`
  mutation CrearNotaria($input: NotariaInput!) {
    crearNotaria(input: $input) {
      item {
        ...NotariaBase
      }
      success
      message
    }
  }
  ${NOTARIA_BASE_FRAGMENT}
`

// Actualizar notaría existente
export const ACTUALIZAR_NOTARIA = gql`
  mutation ActualizarNotaria($id: ID!, $input: NotariaInput!) {
    actualizarNotaria(id: $id, input: $input) {
      item {
        ...NotariaBase
      }
      success
      message
    }
  }
  ${NOTARIA_BASE_FRAGMENT}
`

// Eliminar notaría
export const ELIMINAR_NOTARIA = gql`
  mutation EliminarNotaria($id: ID!) {
    eliminarNotaria(id: $id) {
      success
      message
    }
  }
`