class Normal {
	/**
	 * Creates a normal distrubtion:
	 * Refer to: https://en.wikipedia.org/wiki/Normal_distribution
	 * @param {number} mean
	 * @param {number} stddev
	 */
	constructor(mean, stddev) {
		this.mean = mean;
		this.stddev = stddev;
		this.variance = stddev * stddev;
		this.cdf = this.cdf.bind(this);
		this.pdf = this.pdf.bind(this);
	}

	/**
	 * Calculates the approximation of the CDF.
	 * @param {number} x
	 * @returns {number}
	 */
	cdf(x) {
		let { mean, stddev } = this;
		let erf = Normal.erf;
		return 0.5 * (1 + erf((x - mean) / (stddev * Math.sqrt(2))));
	}

	/**
	 * Calculates the derivative of the PDF.
	 * @param {number} x
	 * @returns {number}
	 */
	pdf(x) {
		let { mean, variance } = this;
		return (
			Math.exp(-Math.pow(x - mean, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance)
		);
	}

	/**
	 * Calculates the error function at x based on the
	 * Python Math.erf implementation
	 * https://docs.python.org/2/library/math.html#math.erf
	 * @param {number} x
	 */
	static erf(x) {
		// save the sign of x
		var sign = x >= 0 ? 1 : -1;
		x = Math.abs(x);

		// constants
		var a1 = 0.254829592;
		var a2 = -0.284496736;
		var a3 = 1.421413741;
		var a4 = -1.453152027;
		var a5 = 1.061405429;
		var p = 0.3275911;

		// A&S formula 7.1.26
		var t = 1.0 / (1.0 + p * x);
		var y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
		return sign * y; // erf(-x) = -erf(x);
	}
}

/**
 * Standard normal distrubtion
 */
Normal.standard = new Normal(0, 1);

module.exports.Normal = Normal;
