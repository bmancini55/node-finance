import { expect } from "chai";
import * as sut from "../lib/stats-basic";

describe(".calcSum", () => {
  it("should add numbers", () => {
    expect(sut.calcSum([1, 2, 3])).to.equal(6);
  });
});

describe(".calcMean", () => {
  it("should calculate mean", () => {
    expect(sut.calcMean([1, 2, 3])).to.equal(2);
  });
});

describe(".calcDeviance", () => {
  it("should calculate deviance", () => {
    expect(sut.calcDeviance([1, 2, 3])).to.deep.equal([-1, 0, 1]);
  });

  it("should calculate deviance with mean", () => {
    expect(sut.calcDeviance([1, 2, 3], 2)).to.deep.equal([-1, 0, 1]);
  });
});

describe(".calcVariance", () => {
  it("should calculate variance", () => {
    expect(sut.calcVariance([1, 2, 3])).to.be.closeTo(1, 0.001);
  });

  it("should calculate variance with devs", () => {
    expect(sut.calcVariance([1, 2, 3], [-1, 0, 1], 2)).to.be.closeTo(1, 0.001);
  });
});

describe(".calcStdDev", () => {
  it("should calculate std dev", () => {
    expect(sut.calcStdDev([1, 2, 3])).to.be.closeTo(1, 0.001);
  });
});
