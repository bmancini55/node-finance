import { expect } from "chai";
import { Normal } from "../lib/stats-normal";

describe("Normal", () => {
  describe("standard", () => {
    it("should have mean of 0", () => {
      expect(Normal.standard.mean).to.equal(0);
    });

    it("should have standard deviation of 1", () => {
      expect(Normal.standard.stddev).to.equal(1);
    });

    it("should have variance of 1", () => {
      expect(Normal.standard.variance).to.equal(1);
    });

    describe("cdf", () => {
      const tests = [
        [-3, 0.0013],
        [-2, 0.0227],
        [-1, 0.1586],
        [0, 0.5],
        [1, 0.8413],
        [2, 0.9772],
        [3, 0.9986],
      ];
      for (const [input, expected] of tests) {
        it(`should have correct cdf for x = ${input}`, () => {
          expect(Normal.standard.cdf(input)).to.be.closeTo(expected, 0.0001);
        });
      }
    });

    describe("pdf", () => {
      const tests = [
        [-3, 0.0044],
        [-2, 0.0539],
        [-1, 0.2419],
        [0, 0.3989],
        [1, 0.2419],
        [2, 0.0539],
        [3, 0.0044],
      ];
      for (const [input, expected] of tests) {
        it(`should have correct pdf for x = ${input}`, () => {
          expect(Normal.standard.pdf(input)).to.be.closeTo(expected, 0.0001);
        });
      }
    });
  });

  describe("non-standard", () => {
    const sut = new Normal(1, 0.5);

    it("should have mean", () => {
      expect(sut.mean).to.equal(1);
    });

    it("should have standard deviation", () => {
      expect(sut.stddev).to.equal(0.5);
    });

    it("should have variance", () => {
      expect(sut.variance).to.equal(0.25);
    });

    describe("cdf", () => {
      const tests = [[0.5, 0.1586], [1, 0.5], [1.5, 0.8413], [2, 0.9772]];
      for (const [input, expected] of tests) {
        it(`should have correct cdf for x = ${input}`, () => {
          expect(sut.cdf(input)).to.be.closeTo(expected, 0.0001);
        });
      }
    });

    describe("pdf", () => {
      const tests = [[0.5, 0.4839], [1, 0.7978], [1.5, 0.4839], [2, 0.1079]];
      for (const [input, expected] of tests) {
        it(`should have correct cdf for x = ${input}`, () => {
          expect(sut.pdf(input)).to.be.closeTo(expected, 0.0001);
        });
      }
    });
  });
});
