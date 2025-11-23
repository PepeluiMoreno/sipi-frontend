import gql from 'graphql-tag'

// Fragmento con campos comunes
const COLEGIO_PROFESIONAL_BASE_FRAGMENT = gql`
  fragment ColegioProfesionalBase on ColegioProfesional {
    id
    nombre
    tipoIdentificacion
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
  }
`

// Listar colegios profesionales
export const LISTAR_COLEGIOS_PROFESIONALES = gql`
  query ListarColegiosProfesionales($filters: ColegioProfesionalFiltersInput, $pagination: PaginationInput) {
    colegiosProfesionales(filters: $filters, pagination: $pagination) {
      items {
        ...ColegioProfesionalBase
      }
      total
      totalPages
      page
      pageSize
    }
  }
  ${COLEGIO_PROFESIONAL_BASE_FRAGMENT}
`

// Obtener un colegio profesional por ID
export const OBTENER_COLEGIO_PROFESIONAL = gql`
  query ObtenerColegioProfesional($id: ID!) {
    colegioProfesional(id: $id) {
      item {
        ...ColegioProfesionalBase
      }
    }
  }
  ${COLEGIO_PROFESIONAL_BASE_FRAGMENT}
`