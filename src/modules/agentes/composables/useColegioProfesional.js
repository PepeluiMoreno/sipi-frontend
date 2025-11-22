import { useAgenteBase } from './useAgenteBase'

export function useColegioProfesional() {
  return useAgenteBase('colegiosProfesionales', { conContacto: true })
}