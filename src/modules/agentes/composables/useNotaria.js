import { useAgenteBase } from './useAgenteBase'
import * as queries from '../graphql/notariaQueries'

export function useNotaria() {
  const base = useAgenteBase('notarias', queries, { conContacto: true })

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorLocalidad
  }
}