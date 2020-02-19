import { expect } from "chai";
import { calcNewtonRaphson } from "../lib/math-newton-raphson";

describe(".calcNewtonRaphson", () => {
  it("should converge", () => {
    const fx = x => Math.pow(x, 2); // x^2
    const gx = x => 2 * x; // 2x
    expect(calcNewtonRaphson(fx, gx, 1, 30)).to.be.closeTo(0.0, 0.001);
  });

  it("should not converge", () => {
    const fx = x => Math.pow(x, 2); // x^2
    const gx = x => 2 * x; // 2x
    expect(calcNewtonRaphson(fx, gx, 1)).to.equal(0);
  });

  it("should converge", () => {
    const fx = x => Math.pow(x, 3) - 2 * x; // x^3 - 2x
    const gx = x => 3 * Math.pow(x, 2) - 2; // 3x^2 - 2
    expect(calcNewtonRaphson(fx, gx, 2)).to.be.closeTo(1.414, 0.001);
  });
});
