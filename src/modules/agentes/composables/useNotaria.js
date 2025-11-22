import { useAgenteBase } from './useAgenteBase'

export function useNotaria() {
  const base = useAgenteBase('notarias', { conContacto: true })

  const listarPorLocalidad = async (localidadId) => {
    return base.listar({ localidadId })
  }

  return {
    ...base,
    listarPorLocalidad
  }
}