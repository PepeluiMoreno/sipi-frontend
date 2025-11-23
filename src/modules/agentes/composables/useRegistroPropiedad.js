import { useAgenteBase } from './useAgenteBase'
import * as queries from '../graphql/registroPropiedadQueries'

export function useRegistroPropiedad() {
  const base = useAgenteBase('registrosPropiedad', queries, { conContacto: true })

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorLocalidad
  }
}