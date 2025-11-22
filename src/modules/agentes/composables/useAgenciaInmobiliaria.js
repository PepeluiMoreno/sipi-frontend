import { useAgenteBase } from './useAgenteBase'

export function useAgenciaInmobiliaria() {
  const base = useAgenteBase('agenciasInmobiliarias', { conContacto: true })

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorLocalidad
  }
}