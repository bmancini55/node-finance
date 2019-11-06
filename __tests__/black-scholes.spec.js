const { expect } = require('chai');
const { calcOptionPrice } = require('../lib/black-scholes');
const { calcPutFromCall } = require('../lib/black-scholes');
const { calcCallFromPut } = require('../lib/black-scholes');
const { calcOptionDelta } = require('../lib/black-scholes');
const { calcOptionGamma } = require('../lib/black-scholes');
const { calcOptionTheta } = require('../lib/black-scholes');
const { calcOptionVega } = require('../lib/black-scholes');
const { calcOptionRho } = require('../lib/black-scholes');
const { estimateIV } = require('../lib/black-scholes');
const { calcIV } = require('../lib/black-scholes');

describe('black-scholes', () => {
	describe('.calcOptionPrice', () => {
		it('should calculate price for a call', () => {
			expect(calcOptionPrice(true, 42, 40, 0.5, 0.05, 0.2)).to.be.closeTo(4.08, 0.01);
		});

		it('should calculate price for a put', () => {
			expect(calcOptionPrice(false, 42, 40, 0.5, 0.05, 0.2)).to.be.closeTo(1.09, 0.01);
		});
	});

	describe('.calcPutFromCall', () => {
		it('should calculate price correctly', () => {
			expect(calcPutFromCall(4.08, 42, 40, 0.5, 0.05)).to.be.closeTo(1.09, 0.01);
		});
	});

	describe('.calcCallFromPut', () => {
		it('should calculate price correctly', () => {
			expect(calcCallFromPut(1.09, 42, 40, 0.5, 0.05)).to.be.closeTo(4.08, 0.01);
		});
	});

	describe('.calcOptionDelta', () => {
		it('should calculate the option delta for a call', () => {
			expect(calcOptionDelta(true, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				0.5371,
				0.0001
			);
		});

		it('should calculate the option delta for a put', () => {
			expect(calcOptionDelta(false, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				-0.4629,
				0.0001
			);
		});
	});

	describe('.calcOptionGamma', () => {
		it('should calculate option gamma', () => {
			expect(calcOptionGamma(100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(0.0554, 0.0001);
		});
	});

	describe('.calcOptionTheta', () => {
		it('should calculate theta for calls', () => {
			expect(calcOptionTheta(true, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				-19.8513,
				0.0001
			);
		});
		it('should calculate theta for puts', () => {
			expect(calcOptionTheta(false, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				-14.8718,
				0.0001
			);
		});
	});

	describe('.calcOptionRho', () => {
		it('should calculate rho for calls', () => {
			expect(calcOptionRho(true, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				4.1629,
				0.0001
			);
		});

		it('should calculate rho for puts', () => {
			expect(calcOptionRho(false, 100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(
				-4.0225,
				0.0001
			);
		});
	});

	describe('.calcOptionVega', () => {
		it('should calculate the option vega', () => {
			expect(calcOptionVega(100, 100, 30 / 365, 0.05, 0.25)).to.be.closeTo(11.3877, 0.0001);
		});
	});

	describe('.calcIV', () => {
		it('should calculate the implied volatility for a call', () => {
			let x0 = estimateIV(1.25, 10.77, 27 / 365);
			expect(calcIV(true, 1.25, 10.77, 10, 27 / 365, 0.0152, x0)).to.be.closeTo(
				0.7113,
				0.0001
			);
		});
		it('should calculate the implied volatility for a put', () => {
			let x0 = estimateIV(1.25, 10.77, 27 / 365);
			expect(calcIV(false, 0.47, 10.77, 10, 27 / 365, 0.0152), x0).to.be.closeTo(
				0.7124,
				0.0001
			);
		});
	});
});
