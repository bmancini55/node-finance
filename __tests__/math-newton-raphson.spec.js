const { expect } = require('chai');
const { calcNewtonRaphson } = require('../lib/math-newton-raphson');

describe('.calcNewtonRaphson', () => {
	it('should converge', () => {
		let fx = x => Math.pow(x, 2); // x^2
		let gx = x => 2 * x; // 2x
		expect(calcNewtonRaphson(fx, gx, 1, 30)).to.be.closeTo(0.0, 0.001);
	});

	it('should not converge', () => {
		let fx = x => Math.pow(x, 2); // x^2
		let gx = x => 2 * x; // 2x
		expect(calcNewtonRaphson(fx, gx, 1)).to.equal(0);
	});

	it('should converge', () => {
		let fx = x => Math.pow(x, 3) - 2 * x; // x^3 - 2x
		let gx = x => 3 * Math.pow(x, 2) - 2; // 3x^2 - 2
		expect(calcNewtonRaphson(fx, gx, 2)).to.be.closeTo(1.414, 0.001);
	});
});
