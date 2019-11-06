const { Normal } = require('./stats-normal');
const { calcContPV } = require('./calc-cont-pv');
const { calcNewtonRaphson } = require('./math-newton-raphson');

module.exports = {
	calcOptionPrice,
	calcPutFromCall,
	calcCallFromPut,
	calcOptionDelta,
	calcOptionGamma,
	calcOptionTheta,
	calcOptionRho,
	calcOptionVega,

	estimateIV,
	calcIV,
};

/**
 * Calculates D1 in Black-Scholes
 *
 * @param {number} spot spot price
 * @param {number} strike strike price
 * @param {number} time time in days
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility
 */
function calcBlackScholesD1(spot, strike, time, rfr, sigma) {
	return (
		(Math.log(spot / strike) + (rfr + (sigma * sigma) / 2) * time) / (sigma * Math.sqrt(time))
	);
}

/**
 * Calculates D2 in Black-Scholes
 *
 * @param {number} d1 D1 value in Black-Scholes
 * @param {number} sigma volatility
 * @param {number} time time in days
 */
function calcBlackScholesD2(d1, sigma, time) {
	return d1 - sigma * Math.sqrt(time);
}

/**
 * Using Black-Scholes, this will calculate the call price for a European options given
 * the current spot price, strike price, time in years til expiration, a risk free return,
 * the volatility of the asset.
 *
 * Refer to:
 * https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black%E2%80%93Scholes_formula
 *
 * @param {boolean} call true for call, fasle for put
 * @param {number} spot spot price
 * @param {number} strike strike price
 * @param {number} time time in years
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility
 * @returns {number}
 */
function calcOptionPrice(call, spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	let d2 = calcBlackScholesD2(d1, sigma, time);
	let pv = calcContPV(strike, rfr, time);
	let cp = call ? 1 : -1;
	// call:  cdf(d1 ) * spot - cdf(d2 ) * pv
	// put:  -cdf(-d1) * spot + cdf(-d2) * pv
	return cp * Normal.standard.cdf(cp * d1) * spot - cp * Normal.standard.cdf(cp * d2) * pv;
}

/**
 * Using Black-Scholes and put-call parity, calculate the expected put price given
 * call price, current spot price, strike price, time and riskFreeRate
 *
 * Refer to:
 * https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black%E2%80%93Scholes_formula
 *
 * @param {number} option price
 * @param {number} spot price
 * @param {number} strike price
 * @param {number} time in years
 * @param {number} rfr
 * @returns {number} price of the put option
 */
function calcPutFromCall(option, spot, strike, time, rfr) {
	let pv = calcContPV(strike, rfr, time);
	return option + pv - spot;
}

/**
 * Using Black-Scholes and put-call parity, calculate the expected call price given
 * put price, current spot price, strike price, time and riskFreeRate
 *
 * @param {number} option price
 * @param {number} spot price
 * @param {number} strike price
 * @param {number} time in years
 * @param {number} rfr
 * @returns {number} price of the call option
 */
function calcCallFromPut(option, spot, strike, time, rfr) {
	let pv = calcContPV(strike, rfr, time);
	return option + spot - pv;
}

/**
 * Calculates delta
 * @param {bool} call true for call, false for put
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time days until expiration
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility of the asset
 */
function calcOptionDelta(call, spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	return Normal.standard.cdf(d1) - (call ? 0 : 1);
}

/**
 * Calculates gamma
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time days until expiration
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility of the asset
 */
function calcOptionGamma(spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	return Normal.standard.pdf(d1) / (spot * sigma * Math.sqrt(time));
}

/**
 * Calculates theta
 * @param {bool} call true for call, false for put
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time days until expiration
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility of the asset
 */
function calcOptionTheta(call, spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	let d2 = calcBlackScholesD2(d1, sigma, time);
	let cp = call ? 1 : -1;
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
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time days until expiration
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility of the asset
 */
function calcOptionVega(spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	return spot * Math.sqrt(time) * Normal.standard.pdf(d1);
}

/**
 * Calculates rho for a European option.
 * @param {bool} call true for call, false for put
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time days until expiration
 * @param {number} rfr risk free rate
 * @param {number} sigma volatility of the asset
 */
function calcOptionRho(call, spot, strike, time, rfr, sigma) {
	let d1 = calcBlackScholesD1(spot, strike, time, rfr, sigma);
	let d2 = calcBlackScholesD2(d1, sigma, time);
	let cp = call ? 1 : -1;
	return cp * strike * time * Math.exp(-rfr * time) * Normal.standard.cdf(cp * d2);
}

/**
 * Estimate the implied volatility via the Brenner and Subrahmanyam method.
 *
 * @param {number} option price of the option
 * @param {number} spot spot price of the asset
 * @param {number} time time in days
 */
function estimateIV(option, spot, time) {
	return Math.sqrt((2 * Math.PI) / time) * (option / spot);
}

/**
 * Calculate the implied volatility by using Newton-Raphson where BS(v)
 * and Vega(v) are used as f(x) and g(x) respectively.
 *
 * @param {boolean} call true for call, false for put
 * @param {number} option price of the option
 * @param {number} spot spot price of the asset
 * @param {number} strike strike price of the option
 * @param {number} time time in days
 * @param {number} rfr risk free rate
 * @param {number} [estIV] estimated IV, defaults to 1
 */
function calcIV(call, option, spot, strike, time, rfr, estIV = 1) {
	let x0 = estIV;
	let fx = volatility => calcOptionPrice(call, spot, strike, time, rfr, volatility) - option;
	let gx = volatility => calcOptionVega(spot, strike, time, rfr, volatility);
	return calcNewtonRaphson(fx, gx, x0, 64, 1e-3);
}
