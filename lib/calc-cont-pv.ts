/**
 * Calculates the continuously compounded present value.
 */
export function calcContPV(price: number, rfr: number, time: number) {
  return price * Math.exp(-rfr * time);
}
