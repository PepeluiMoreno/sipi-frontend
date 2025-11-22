import { useAgenteBase } from './useAgenteBase'

export function useAdministracion() {
  const base = useAgenteBase('administraciones', { conContacto: true, conRelaciones: true })

  // Ampliar con filtros específicos
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