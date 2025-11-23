import { useAgenteBase } from './useAgenteBase'
import * as queries from '../graphql/administracionQueries'

export function useAdministracion() {
  const base = useAgenteBase('administraciones', queries, { conContacto: true, conRelaciones: true })

  const listarPorAmbito = async (ambito) => {
    return base.listar({ ambito })
  }

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorAmbito,
    listarPorLocalidad
  }
}