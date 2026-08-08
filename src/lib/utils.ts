/**
 * Utilidad `cn` mínima (sin dependencias) para unir clases condicionales.
 * Compatible con el uso de shadcn/21st.dev: `cn("a", cond && "b", undefined)`.
 * No hace merge de clases Tailwind en conflicto (no es necesario aquí), solo
 * filtra valores falsy y une con espacios.
 */
export type ClassValue = string | number | false | null | undefined

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ')
}
