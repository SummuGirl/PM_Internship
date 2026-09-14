export function generateRequestId(prefix: 'FOLK' | 'MID' | 'NINE' = 'FOLK'): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5-digit number
  return `#${prefix}-${randomDigits}`;
}
