import { Normal } from "./stats-normal";
import { calcContPV } from "./calc-cont-pv";
import { calcNewtonRaphson } from "./math-newton-raphson";

/**
 * Calculates D1 in Black-Scholes
 *
 * @param spot spot price
 * @param strike strike price
 * @param time time in days
 * @param rfr risk free rate
 * @param sigma volatility
 */
function calcBlackScholesD1(
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  return (Math.log(spot / strike) + (rfr + (sigma * sigma) / 2) * time) / (sigma * Math.sqrt(time));
}

/**
 * Calculates D2 in Black-Scholes
 *
 * @param d1 D1 value in Black-Scholes
 * @param sigma volatility
 * @param time time in days
 */
function calcBlackScholesD2(d1: number, sigma: number, time: number): number {
  return d1 - sigma * Math.sqrt(time);
}

/**
 * Using Black-Scholes, this will calculate the call price for a European options given
 * the current spot price, strike price, time in years til expiration, a risk free return,
 * the volatility of the asset.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black%E2%80%93Scholes_formula
 *
 * @param call true for call, fasle for put
 * @param spot spot price
 * @param strike strike price
 * @param time time in years
 * @param rfr risk free rate
 * @param sigma volatility
 */
export function calcOptionPrice(
  call: boolean,
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  const d2 = calcBlackScholesD2(d1, sigma, time);
  const pv = calcContPV(strike, rfr, time);
  const cp = call ? 1 : -1;
  // call:  cdf(d1 ) * spot - cdf(d2 ) * pv
  // put:  -cdf(-d1) * spot + cdf(-d2) * pv
  return cp * Normal.standard.cdf(cp * d1) * spot - cp * Normal.standard.cdf(cp * d2) * pv;
}

/**
 * Using Black-Scholes and put-call parity, calculate the expected put price given
 * call price, current spot price, strike price, time and riskFreeRate
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black%E2%80%93Scholes_formula
 *
 * @param option price
 * @param spot price
 * @param strike price
 * @param time in years
 * @param rfr
 * @returns price of the put option
 */
export function calcPutFromCall(
  option: number,
  spot: number,
  strike: number,
  time: number,
  rfr: number
): number {
  const pv = calcContPV(strike, rfr, time);
  return option + pv - spot;
}

/**
 * Using Black-Scholes and put-call parity, calculate the expected call price given
 * put price, current spot price, strike price, time and riskFreeRate
 *
 * @param option price
 * @param spot price
 * @param strike price
 * @param time in years
 * @param rfr
 * @returns price of the call option
 */
export function calcCallFromPut(
  option: number,
  spot: number,
  strike: number,
  time: number,
  rfr: number
): number {
  const pv = calcContPV(strike, rfr, time);
  return option + spot - pv;
}

/**
 * Calculates delta
 * @param call true for call, false for put
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time days until expiration
 * @param rfr risk free rate
 * @param sigma volatility of the asset
 */
export function calcOptionDelta(
  call: boolean,
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  return Normal.standard.cdf(d1) - (call ? 0 : 1);
}

/**
 * Calculates gamma
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time days until expiration
 * @param rfr risk free rate
 * @param sigma volatility of the asset
 */
export function calcOptionGamma(
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  return Normal.standard.pdf(d1) / (spot * sigma * Math.sqrt(time));
}

/**
 * Calculates theta
 * @param call true for call, false for put
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time days until expiration
 * @param rfr risk free rate
 * @param sigma volatility of the asset
 */
export function calcOptionTheta(
  call: boolean,
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  const d2 = calcBlackScholesD2(d1, sigma, time);
  const cp = call ? 1 : -1;
  return (
    -(spot * Normal.standard.pdf(d1) * sigma) / (2 * Math.sqrt(time)) -
    cp * rfr * strike * Math.exp(-rfr * time) * Normal.standard.cdf(cp * d2)
  );
}

/**
 * Calculates the vega for a European option. Vega is the first
 * derivative of an option’s price with respect to volatility.
 *
 * Note that this calculates based on the sigma as the unit,
 * so it represents a 100% change in volatility. You must divide
 * by 100 to get the 1% change (which is more useful) for calculating
 * price changes.
 *
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time days until expiration
 * @param rfr risk free rate
 * @param sigma volatility of the asset
 */
export function calcOptionVega(
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  return spot * Math.sqrt(time) * Normal.standard.pdf(d1);
}

/**
 * Calculates rho for a European option.
 * @param call true for call, false for put
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time days until expiration
 * @param rfr risk free rate
 * @param sigma volatility of the asset
 */
export function calcOptionRho(
  call: boolean,
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  sigma: number
): number {
  const d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
  const d2 = calcBlackScholesD2(d1, sigma, time);
  const cp = call ? 1 : -1;
  return cp * strike * time * Math.exp(-rfr * time) * Normal.standard.cdf(cp * d2);
}

/**
 * Estimate the implied volatility via the Brenner and Subrahmanyam method.
 *
 * @param option price of the option
 * @param spot spot price of the asset
 * @param time time in days
 */
export function estimateIV(option: number, spot: number, time: number): number {
  return Math.sqrt((2 * Math.PI) / time) * (option / spot);
}

/**
 * Calculate the implied volatility by using Newton-Raphson where BS(v)
 * and Vega(v) are used as f(x) and g(x) respectively.
 *
 * @param call true for call, false for put
 * @param option price of the option
 * @param spot spot price of the asset
 * @param strike strike price of the option
 * @param time time in days
 * @param rfr risk free rate
 * @param estIV optional estimated IV, defaults to 1
 */
export function calcIV(
  call: boolean,
  option: number,
  spot: number,
  strike: number,
  time: number,
  rfr: number,
  estIV: number = 1
): number {
  const x0 = estIV;
  const fx = volatility => calcOptionPrice(call, spot, strike, time, rfr, volatility) - option;
  const gx = volatility => calcOptionVega(spot, strike, time, rfr, volatility);
  return calcNewtonRaphson(fx, gx, x0, 64, 1e-3);
}
