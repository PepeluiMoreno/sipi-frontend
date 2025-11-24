// modules/inmuebles/graphql/inmuebleQueries.js
import { gql } from '@apollo/client/core'

export const LISTAR_INMUEBLES = gql`
  query ListarInmuebles(
    $filters: InmuebleFilters
    $pagination: PaginationInput
  ) {
    inmuebles(filters: $filters, pagination: $pagination) {
      items {
        id
        nombre
        tipoInmueble {
          id
          nombre
        }
        localidad {
          id
          nombre
          provincia {
            id
            nombre
            comunidadAutonoma {
              id
              nombre
            }
          }
        }
        direccion
        latitud
        longitud
        esBic
        esRuina
        estadoConservacion {
          id
          nombre
        }
        estadoTratamiento {
          id
          nombre
        }
        tieneCoordenadas
        protegido
        createdAt
        updatedAt
        # Relaciones para computed properties
        figurasProteccion {
          id
          tipo
        }
        denominaciones {
          id
          denominacion
          esPrincipal
        }
      }
      total
      totalPages
    }
  }
`

export const OBTENER_INMUEBLE = gql`
  query ObtenerInmueble(
    $id: ID!
    $conDenominaciones: Boolean = false
    $conTransmisiones: Boolean = false
    $conActuaciones: Boolean = false
    $conDocumentos: Boolean = false
    $conFigurasProteccion: Boolean = false
    $conInmatriculacion: Boolean = false
    $conOSM: Boolean = false
    $conWikidata: Boolean = false
  ) {
    inmueble(id: $id) {
      item {
        id
        nombre
        descripcion
        tipoInmueble {
          id
          nombre
        }
        localidad {
          id
          nombre
          provincia {
            id
            nombre
            comunidadAutonoma {
              id
              nombre
            }
          }
        }
        direccion
        latitud
        longitud
        esBic
        esRuina
        estaInmatriculado
        estadoConservacion {
          id
          nombre
        }
        estadoTratamiento {
          id
          nombre
        }
        diocesis {
          id
          nombre
        }
        createdAt
        updatedAt
        
        # Relaciones opcionales
        denominaciones @include(if: $conDenominaciones) {
          id
          denominacion
          esPrincipal
          idioma
        }
        
        transmisiones @include(if: $conTransmisiones) {
          id
          tipoTransmision
          fechaTransmision
          transmitente
          adquirente
        }
        
        actuaciones @include(if: $conActuaciones) {
          id
          tipo
          descripcion
          fechaInicio
          fechaFin
          estado
        }
        
        documentos @include(if: $conDocumentos) {
          id
          tipo
          titulo
          fechaDocumento
        }
        
        figurasProteccion @include(if: $conFigurasProteccion) {
          id
          tipo
          nivel
          fechaDeclaracion
        }
        
        inmatriculacion @include(if: $conInmatriculacion) {
          id
          numeroFinca
          fechaInmatriculacion
        }
        
        osmExt @include(if: $conOSM) {
          id
          osmId
          name
        }
        
        wdExt @include(if: $conWikidata) {
          id
          wikidataQid
        }
      }
    }
  }
`

export const CREAR_INMUEBLE = gql`
  mutation CrearInmueble($input: InmuebleInput!) {
    crearInmueble(input: $input) {
      success
      item {
        id
        nombre
        tipoInmueble {
          id
          nombre
        }
        localidad {
          id
          nombre
        }
        direccion
        latitud
        longitud
      }
      message
    }
  }
`

export const ACTUALIZAR_INMUEBLE = gql`
  mutation ActualizarInmueble($id: ID!, $input: InmuebleInput!) {
    actualizarInmueble(id: $id, input: $input) {
      success
      item {
        id
        nombre
        tipoInmueble {
          id
          nombre
        }
        localidad {
          id
          nombre
        }
        direccion
        latitud
        longitud
        updatedAt
      }
      message
    }
  }
`

export const ELIMINAR_INMUEBLE = gql`
  mutation EliminarInmueble($id: ID!) {
    eliminarInmueble(id: $id) {
      success
      message
    }
  }
`