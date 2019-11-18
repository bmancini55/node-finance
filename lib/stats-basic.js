module.exports = {
	calcSum,
	calcMean,

	calcDeviance,
	calcVariance,
	calcStdDev,

	calcZScore,
};

/////////////////////////////////////////////

/**
 * Calculates the sum of a vector
 * @param {number[]} vals
 * @return {number}
 */
function calcSum(vals) {
	let sum = 0;
	for (let val of vals) {
		sum += val;
	}
	return sum;
}

/**
 * Calculates the mean of a list a vector
 * @param {number[]} vals
 * @returns {number}
 */
function calcMean(vals) {
	let sum = calcSum(vals);
	return sum / vals.length;
}

/**
 * Calculates the deviance of each value from the mean
 * @param {number[]} vals
 * @param {number} [mean]
 * @returns {number[]} deviance off mean
 */
function calcDeviance(vals, mean) {
	if (mean == undefined) {
		mean = calcMean(vals);
	}
	let devs = new Array(vals.length);
	for (let i = 0; i < vals.length; i++) {
		devs[i] = vals[i] - mean;
	}
	return devs;
}

/**
 * Calculates the variance for a set of numbers
 * @param {number[]} vals
 * @param {number[]} [devs] optional deviance of each value
 * @param {number} [mean] optional mean
 * @returns {number}
 */
function calcVariance(vals, devs, mean) {
	if (!devs) {
		devs = calcDeviance(vals, mean);
	}
	let sum = 0;
	for (let i = 0; i < devs.length; i++) {
		sum += Math.pow(devs[i], 2);
	}
	let n = devs.length - 1;
	return sum / n;
}

/**
 * Calculates the standard deviation for a set of values
 * @param {number[]} vals
 * @param {number} [variance]
 */
function calcStdDev(vals, variance) {
	if (variance === undefined) {
		variance = calcVariance(vals);
	}
	return Math.sqrt(variance);
}

/**
 * Returns the z-score for a given value
 * @param {number} x
 * @returns {number}
 */
function calcZScore(x, mean, stddev) {
	return (x - mean) / stddev;
}
