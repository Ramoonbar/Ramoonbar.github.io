// Versión simple de cn para no depender de paquetes externos no instalados
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
