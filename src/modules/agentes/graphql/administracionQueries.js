import gql from 'graphql-tag'

// Fragmento con campos comunes
const ADMINISTRACION_BASE_FRAGMENT = gql`
  fragment AdministracionBase on Administracion {
    id
    nombre
    ambito
    nombreResponsable
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

// Listar administraciones con paginación y filtros
export const LISTAR_ADMINISTRACIONES = gql`
  query ListarAdministraciones($filters: AdministracionFiltersInput, $pagination: PaginationInput) {
    administraciones(filters: $filters, pagination: $pagination) {
      items {
        ...AdministracionBase
      }
      total
      totalPages
      page
      pageSize
    }
  }
  ${ADMINISTRACION_BASE_FRAGMENT}
`

// Obtener una administración por ID
export const OBTENER_ADMINISTRACION = gql`
  query ObtenerAdministracion($id: ID!) {
    administracion(id: $id) {
      item {
        ...AdministracionBase
      }
    }
  }
  ${ADMINISTRACION_BASE_FRAGMENT}
`

// Crear nueva administración
export const CREAR_ADMINISTRACION = gql`
  mutation CrearAdministracion($input: AdministracionInput!) {
    crearAdministracion(input: $input) {
      item {
        ...AdministracionBase
      }
      success
      message
    }
  }
  ${ADMINISTRACION_BASE_FRAGMENT}
`

// Actualizar administración existente
export const ACTUALIZAR_ADMINISTRACION = gql`
  mutation ActualizarAdministracion($id: ID!, $input: AdministracionInput!) {
    actualizarAdministracion(id: $id, input: $input) {
      item {
        ...AdministracionBase
      }
      success
      message
    }
  }
  ${ADMINISTRACION_BASE_FRAGMENT}
`

// Eliminar administración
export const ELIMINAR_ADMINISTRACION = gql`
  mutation EliminarAdministracion($id: ID!) {
    eliminarAdministracion(id: $id) {
      success
      message
    }
  }
`