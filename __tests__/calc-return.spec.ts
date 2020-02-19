import { expect } from "chai";
import { calcReturn } from "../lib/calc-return";

describe(".calcReturn", () => {
  it("should have proper return", () => {
    expect(calcReturn(1000, 100)).to.be.closeTo(0.1, 0.001);
  });

  it("should have proper return", () => {
    expect(calcReturn(1000, -100)).to.be.closeTo(-0.1, 0.001);
  });
});
