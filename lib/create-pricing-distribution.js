const { Lognormal } = require('./stats-lognormal');

module.exports = {
	createDistribution,
};

/**
 * Creates a lognormal distribution for the asset based
 * on its spot price, target days, and annualized volatility
 *
 * @param {number} spot current spot price
 * @param {number} days days until expiration
 * @param {number} vol annualized volatility of asset
 * @returns {Lognormal}
 */
function createDistribution(spot, days, vol) {
	let lognorm_mean = Math.log(spot);
	let lognorm_sd = vol * Math.sqrt(days / 365);
	return new Lognormal(lognorm_mean, lognorm_sd);
}
