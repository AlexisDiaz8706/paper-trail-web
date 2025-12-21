/**
 * Returns a realistic delay in milliseconds for mock responses
 * Simulates network latency variation
 */
export function mockDelay(min = 100, max = 400): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
