/**
 * Calculates the intrinsic value of an option
 * @param isCall true when option is call, false when option is put
 * @param strike strike price of the option
 * @param spot current spot price of underlying
 */
export function calcIntrisicValue(isCall: boolean, strike: number, spot: number): number {
  return Math.max(0, isCall ? spot - strike : strike - spot);
}

/**
 * Calculates the time value of an option
 * @param isCall true when option is call, false when option is put
 * @param option price of the option
 * @param strike strike price of the option
 * @param spot current spot price of underlying
 */
export function calcTimeValue(
  isCall: boolean,
  option: number,
  strike: number,
  spot: number
): number {
  return option - calcIntrisicValue(isCall, strike, spot);
}
