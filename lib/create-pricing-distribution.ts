import { Lognormal } from "./stats-lognormal";

/**
 * Creates a lognormal distribution for the asset based
 * on its spot price, target days, and annualized volatility
 *
 * @param spot current spot price
 * @param days days until expiration
 * @param vol annualized volatility of asset
 * @returns a new Lognormal distribution with the given parameters
 */
export function createDistribution(spot: number, days: number, vol: number): Lognormal {
  const lognorm_mean = Math.log(spot);
  const lognorm_sd = vol * Math.sqrt(days / 365);
  return new Lognormal(lognorm_mean, lognorm_sd);
}
