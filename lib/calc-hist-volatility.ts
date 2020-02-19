import { calcStdDev } from "./stats-basic";

/**
 * Calculates the historic volatility (std dev of returns) based
 * on price history.
 */
export function calcHistVolatility(prices: number[]): number {
  const returns = new Array(prices.length - 1);
  for (let i = 1; i < prices.length; i++) {
    returns[i - 1] = prices[i] / prices[i - 1] - 1;
  }
  return calcStdDev(returns);
}
