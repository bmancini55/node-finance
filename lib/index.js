module.exports = {
	...require('./calc-annual-return'),
	...require('./calc-cont-pv'),
	...require('./calc-hist-volatility'),
	...require('./calc-price-probability'),
	...require('./calc-return'),
	...require('./create-pricing-distribution'),

	blackscholes: {
		...require('./black-scholes'),
	},

	math: {
		...require('./math-newton-raphson'),
	},

	stats: {
		...require('./stats-basic'),
		Normal: require('./stats-normal').Normal,
		Lognormal: require('./stats-lognormal').Lognormal,
	},
};
