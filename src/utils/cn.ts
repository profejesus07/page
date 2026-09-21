/** Une clases condicionalmente (sin dependencias externas). */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}
