const { Normal } = require('./stats-normal');

class Lognormal {
	/**
	 * Creates a lognormal distribution with the supplied mean and standard deviation
	 * Refer to https://en.wikipedia.org/wiki/Log-normal_distribution
	 * @param {number} mean
	 * @param {number} stddev
	 */
	constructor(mean, stddev) {
		this.mean = mean;
		this.stddev = stddev;
		this.variance = stddev * stddev;
		this.cdf = this.cdf.bind(this);
		this.pdf = this.pdf.bind(this);
		this.zvalue = this.zvalue.bind(this);
	}

	/**
	 * Calculates the approximation of the CDF.
	 * @param {number} x
	 * @returns {number}
	 */
	cdf(x) {
		let { mean: mu, stddev: sigma } = this;
		let erf = Normal.erf;
		return (1 / 2) * (1 + erf((Math.log(x) - mu) / (sigma * Math.SQRT2)));
	}

	/**
	 * Calculates the derivative of the PDF.
	 * @param {number} x
	 * @returns {number}
	 */
	pdf(x) {
		let { mean: mu, stddev: sigma } = this;
		return (
			(1 / x) *
			(1 / (sigma * Math.sqrt(2 * Math.PI))) *
			Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma))
		);
	}

	/**
	 * Returns the value of X at the specific z-score. This is useful
	 * for retrieving the values at say -1, 0, and 1 standard deviation.
	 * @param {number} zscore
	 * @returns {number}
	 */
	zvalue(zscore) {
		let { mean, stddev } = this;
		return Math.exp(mean + zscore * stddev);
	}
}
module.exports.Lognormal = Lognormal;
