import { useAgenteBase } from './useAgenteBase'

export function useAdquiriente() {
  return useAgenteBase('adquirientes', { conContacto: true })
}