const { expect } = require('chai');
const { calcHistVolatility } = require('../lib/calc-hist-volatility');

describe('.calcHistVolatility', () => {
	it('should calculate historic volatility', () => {
		let input = [650, 420, 690, 600, 500, 420, 670, 630, 550, 650];
		expect(calcHistVolatility(input)).to.be.closeTo(0.352, 0.001);
	});
});
