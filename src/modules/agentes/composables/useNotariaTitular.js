import { useAdministracionTitular } from './useAdministracionTitular'

export function useNotariaTitular(notariaId) {
  const base = useAdministracionTitular(notariaId)
  
  return {
    ...base,
    // Override específico para notarias si es necesario
    listar: () => base.listar(),
    crear: (input) => base.crear({ ...input, notariaId }),
    actualizar: (id, input) => base.actualizar(id, input),
    eliminar: (id) => base.eliminar(id)
  }
}