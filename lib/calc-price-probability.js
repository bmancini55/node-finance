const { createDistribution } = require('./create-pricing-distribution');

module.exports = {
	calcProb,
};

/**
 * Calculates the probability of the asset being at or below
 * the price x in the given number of days.
 *
 * @param {number} x target price
 * @param {number} spot current spot price
 * @param {number} days days until expiration
 * @param {number} vol annualized volatility of asset
 * @returns {number}
 */
function calcProb(x, spot, days, vol) {
	return createDistribution(spot, days, vol).cdf(x);
}
