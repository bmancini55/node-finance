import { expect } from "chai";
import { Lognormal } from "../lib/stats-lognormal";

describe("Lognormal", () => {
  const sut = new Lognormal(Math.log(20), 0.05);

  it("should have mean", () => {
    expect(sut.mean).to.equal(Math.log(20));
  });

  it("should have stddev", () => {
    expect(sut.stddev).to.equal(0.05);
  });

  it("should have variance", () => {
    expect(sut.variance).to.be.closeTo(0.0025, 0.0001);
  });

  describe("cdf", () => {
    const tests = [[18, 0.0175], [20, 0.5], [21, 0.8354], [23, 0.9974]];
    for (const [input, expected] of tests) {
      it(`should have correct cdf for x = ${input}`, () => {
        expect(sut.cdf(input)).to.be.closeTo(expected, 0.0001);
      });
    }
  });

  describe("pdf", () => {
    const tests = [[18, 0.0481], [20, 0.3989], [21, 0.236], [23, 0.0069]];
    for (const [input, expected] of tests) {
      it(`should have correct cdf for x = ${input}`, () => {
        expect(sut.pdf(input)).to.be.closeTo(expected, 0.0001);
      });
    }
  });

  describe("zvalue", () => {
    const tests = [[-1, 19.0245], [0, 20], [1, 21.0254]];
    for (const [input, expected] of tests) {
      it(`should have correct x value for z-score ${input}`, () => {
        expect(sut.zvalue(input)).to.be.closeTo(expected, 1e-4);
      });
    }
  });
});
