const weights = {
  light: 300,
  normal: 400,
  bold: 700,
  extra: 800
} as const

const fonts: Record<keyof typeof weights, string> = {
  light: 'NanumSquare_acL',
  normal: 'NanumSquare_acR',
  bold: 'NanumSquare_acB',
  extra: 'NanumSquare_acEB'
} as const

export { weights, fonts }
