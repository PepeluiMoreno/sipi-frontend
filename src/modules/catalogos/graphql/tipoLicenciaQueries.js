import { gql } from '@apollo/client/core'

// Listado completo con todos los campos específicos
export const LISTAR_TIPOS_LICENCIA = gql`
  query ListarTiposLicencia($filters: TipoLicenciaFilters, $pagination: PaginationInput) {
    tiposLicencia(filters: $filters, pagination: $pagination) {
      items {
        id
        codigo
        nombre
        nombreCorto
        descripcion
        urlLicencia
        urlLegal
        requiereAtribucion
        permiteUsoComercial
        permiteDerivadas
        requiereCompartirIgual
        esLibre
        esOpenSource
        esCopyleft
        version
        jurisdiccion
        familia
        iconoUrl
        colorHex
        popularidad
        recomendada
        obsoleta
        createdAt
        updatedAt
      }
      total
    }
  }
`

// Obtener un tipo de licencia por ID
export const OBTENER_TIPO_LICENCIA = gql`
  query ObtenerTipoLicencia($id: ID!) {
    tipoLicencia(id: $id) {
      item {
        id
        codigo
        nombre
        nombreCorto
        descripcion
        urlLicencia
        urlLegal
        requiereAtribucion
        permiteUsoComercial
        permiteDerivadas
        requiereCompartirIgual
        esLibre
        esOpenSource
        esCopyleft
        version
        jurisdiccion
        familia
        iconoUrl
        colorHex
        popularidad
        recomendada
        obsoleta
      }
    }
  }
`

// Crear tipo de licencia
export const CREAR_TIPO_LICENCIA = gql`
  mutation CrearTipoLicencia($input: TipoLicenciaInput!) {
    crearTipoLicencia(input: $input) {
      success
      item {
        id
        codigo
        nombre
        nombreCorto
        # ... resto de campos
      }
      message
    }
  }
`

// Actualizar tipo de licencia
export const ACTUALIZAR_TIPO_LICENCIA = gql`
  mutation ActualizarTipoLicencia($id: ID!, $input: TipoLicenciaInput!) {
    actualizarTipoLicencia(id: $id, input: $input) {
      success
      item {
        id
        codigo
        nombre
        nombreCorto
        # ... resto de campos
      }
      message
    }
  }
`

// Eliminar tipo de licencia
export const ELIMINAR_TIPO_LICENCIA = gql`
  mutation EliminarTipoLicencia($id: ID!) {
    eliminarTipoLicencia(id: $id) {
      success
      message
    }
  }
`