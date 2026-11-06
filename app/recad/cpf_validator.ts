export function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== "string") return false
  const digits = cpf.replace(/[^\d]+/g, "")
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false

  const numbers = Array.from(digits, Number)
  const rest = (count: number) =>
    ((numbers
      .slice(0, count - 12)
      .reduce((sum, digit, index) => sum + digit * (count - index), 0) *
      10) %
      11) %
    10

  return rest(10) === numbers[9] && rest(11) === numbers[10]
}
