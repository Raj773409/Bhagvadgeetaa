export function isRequired(value: string) { return value.trim().length > 0 }
export function isValidEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) }
export function isValidPhone(value: string) { return /^[0-9][0-9 ()-]{5,18}[0-9]$/.test(value.trim()) }
export function isValidGroupSize(value: string) {
  const n = Number(value)
  return Number.isInteger(n) && n >= 2 && n <= 500
}
export function normalizeEmail(value: string) { return value.trim().toLowerCase() }
