import { useAdministracionTitular } from './useAdministracionTitular'

export function useRegistroPropiedadTitular(registroId) {
  const base = useAdministracionTitular(registroId)
  
  return {
    ...base,
    listar: () => base.listar(),
    crear: (input) => base.crear({ ...input, registroPropiedadId: registroId }),
    actualizar: (id, input) => base.actualizar(id, input),
    eliminar: (id) => base.eliminar(id)
  }
}