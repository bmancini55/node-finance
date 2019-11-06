module.exports = {
	calcNewtonRaphson,
};

/**
 * Performs the Newton-Raphson iteration to find an approximate root of a real-valued
 * function.
 *
 * @param {number => number} fx function f(x)
 * @param {number => number} gx derivative of f(x)
 * @param {number} x0 initial guess
 * @param {number} [N] number of iterations, default is 10
 * @param {number} [e] tolerable error, default is 1e-8
 */
function calcNewtonRaphson(fx, gx, x0, N = 10, e = 1e-8) {
	for (let i = 0; i < N; i++) {
		let gx0 = gx(x0);

		// console.log('x0', x0);
		// console.log('fx0', Math.abs(fx(x0)));
		// console.log('gx0', gx0);

		// check if g(x0) === 0 and error if it is
		if (Math.abs(gx0) < 1e-30) {
			return 0;
		}

		// calculate x1
		let x1 = x0 - fx(x0) / gx0;

		// check if f(x1) is inside error requirement
		let fx1 = fx(x1);
		if (Math.abs(fx1) <= e) {
			return x1;
		}

		// if not try to iterate again
		x0 = x1;
	}

	return 0;
}
