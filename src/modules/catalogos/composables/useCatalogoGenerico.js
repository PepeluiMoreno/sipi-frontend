import { useCatalogoBase } from './useCatalogoBase'

/**
 * Factory para usar el composable base con cualquier nombre de catálogo
 * @param {String} nombre - Nombre del modelo (ej: 'estadosConservacion')
 */
export function useCatalogoGenerico(nombre) {
  return useCatalogoBase(nombre)
}