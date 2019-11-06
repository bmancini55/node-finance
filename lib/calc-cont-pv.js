module.exports = {
	calcContPV,
};

/**
 * Calculates the continuously compounded present value.
 *
 * @param {number} price
 * @param {number} rfr
 * @param {number} time
 */
function calcContPV(price, rfr, time) {
	return price * Math.exp(-rfr * time);
}
