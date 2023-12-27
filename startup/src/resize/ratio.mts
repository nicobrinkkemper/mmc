// determine the aspect ratio of the image based on width and height
// return the 1:2 ratio as a string
export function ratio(width: number, height: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}
