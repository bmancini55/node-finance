/**
 * Returns the gain or loss percentage
 */
export function calcReturn(principal: number, gain: number): number {
  return (principal + gain) / principal - 1;
}
