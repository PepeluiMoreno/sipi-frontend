import { useAgenteBase } from './useAgenteBase'

export function useRegistroPropiedad() {
  const base = useAgenteBase('registrosPropiedad', { conContacto: true })

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorLocalidad
  }
}