const { expect } = require('chai');
const { calcAnnualReturn } = require('../lib/calc-annual-return');

describe('.calcAnnualReturn', () => {
	it('should return proper value', () => {
		let result = calcAnnualReturn(0.2374, 575);
		expect(result).to.be.closeTo(0.145, 0.001);
	});

	it('should return proper value', () => {
		let result = calcAnnualReturn(0.021, 21);
		expect(result).to.be.closeTo(0.44, 0.01);
	});
});
