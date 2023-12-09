const rgbToHex = (r: number, g: number, b: number) => {
  const red = r.toString(16)
  const green = g.toString(16)
  const blue = b.toString(16)

  return `#${red.padStart(2, '0')}${green.padStart(2, '0')}${blue.padStart(
    2,
    '0'
  )}`.toUpperCase()
}

export default rgbToHex
