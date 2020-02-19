export * from "./calc-annual-return";
export * from "./calc-cont-pv";
export * from "./calc-hist-volatility";
export * from "./calc-price-probability";
export * from "./calc-return";
export * from "./create-pricing-distribution";

import * as blackscholesImport from "./black-scholes";
export const blackscholes = {
  ...blackscholesImport,
};

import * as mathNewtonRaphsonImport from "./math-newton-raphson";
export const math = {
  ...mathNewtonRaphsonImport,
};

import * as statsBasicImport from "./stats-basic";
import * as normalImport from "./stats-normal";
import * as lognormalImport from "./stats-lognormal";
export const stats = {
  ...statsBasicImport,
  ...normalImport,
  ...lognormalImport,
};

import * as optionsBasicImport from "./options-basic";
export const options = {
  ...optionsBasicImport,
};
