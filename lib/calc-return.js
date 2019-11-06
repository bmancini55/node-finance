module.exports = {
	calcReturn,
};

/**
 * Returns the gain or loss percentage
 * @param {number} principal
 * @param {number} gain
 * @returns {number}
 */
function calcReturn(principal, gain) {
	return (principal + gain) / principal - 1;
}
