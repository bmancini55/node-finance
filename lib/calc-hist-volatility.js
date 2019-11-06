const { calcStdDev } = require('./stats-basic');

module.exports = {
	calcHistVolatility,
};

/**
 * Calculates the historic volatility (std dev of returns) based
 * on price history.
 * @param {[number]} prices
 * @returns {number}
 */
function calcHistVolatility(prices) {
	let returns = new Array(prices.length - 1);
	for (let i = 1; i < prices.length; i++) {
		returns[i - 1] = prices[i] / prices[i - 1] - 1;
	}
	return calcStdDev(returns);
}
