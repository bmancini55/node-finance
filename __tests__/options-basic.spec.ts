import { expect } from "chai";
import * as options from "../lib/options-basic";

describe(".calcIntrinsicValue()", () => {
  it("should return value for ITM call", () => {
    expect(options.calcIntrisicValue(true, 1000, 1100)).to.equal(100);
  });

  it("should return 0 for OTM call", () => {
    expect(options.calcIntrisicValue(true, 1000, 900)).to.equal(0);
  });

  it("should return value for ITM put", () => {
    expect(options.calcIntrisicValue(false, 1000, 900)).to.equal(100);
  });

  it("should return 0 for OTM put", () => {
    expect(options.calcIntrisicValue(false, 1000, 1100)).to.equal(0);
  });
});

describe(".calcTimeValue()", () => {
  it("should return positive for ITM call", () => {
    expect(options.calcTimeValue(true, 110, 1000, 1100)).to.equal(10);
  });

  it("should return negative for ITM call", () => {
    expect(options.calcTimeValue(true, 90, 1000, 1100)).to.equal(-10);
  });

  it("should return value for OTM call", () => {
    expect(options.calcTimeValue(true, 10, 1000, 910)).to.equal(10);
  });

  it("should return positive for ITM put", () => {
    expect(options.calcTimeValue(false, 110, 1000, 900)).to.equal(10);
  });

  it("should return negative for ITM put", () => {
    expect(options.calcTimeValue(false, 90, 1000, 900)).to.equal(-10);
  });

  it("should return value for OTM put", () => {
    expect(options.calcTimeValue(false, 10, 1000, 1100)).to.equal(10);
  });
});
