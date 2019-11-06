module.exports = {
	calcAnnualReturn,
};

/**
 * Returns the annualized cumulative return of an asset
 * of an asset.
 *
 * @remarks
 * More information:
 * 	https://www.investopedia.com/terms/a/annualized-total-return.asp
 * @param {number} returns
 * @param {number} daysHeld
 * @returns {number}
 */
function calcAnnualReturn(returns, daysHeld) {
	return Math.pow(1 + returns, 365 / daysHeld) - 1;
}
