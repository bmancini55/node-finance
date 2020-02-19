import { createDistribution } from "./create-pricing-distribution";

/**
 * Calculates the probability of the asset being at or below
 * the price x in the given number of days.
 *
 * @param x target price
 * @param spot current spot price
 * @param days days until expiration
 * @param vol annualized volatility of asset
 */
export function calcProb(x: number, spot: number, days: number, vol: number): number {
  return createDistribution(spot, days, vol).cdf(x);
}
