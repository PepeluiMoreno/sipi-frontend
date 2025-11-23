import { useAgenteBase } from './useAgenteBase'
import * as queries from '../graphql/colegioProfesionalQueries'

export function useColegioProfesional() {
  return useAgenteBase('colegiosProfesionales', queries, { conContacto: true })
}