import minidenticon from 'minidenticons'

export function getMinidenticonSvg(seed: string, color?: string) {
  // color is optional, fallback to default
  return minidenticon(seed, color)
}
