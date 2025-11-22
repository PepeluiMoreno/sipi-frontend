import { useAgenteBase } from './useAgenteBase'

export function useTransmitente() {
  return useAgenteBase('transmitentes', { conContacto: true })
}