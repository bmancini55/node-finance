/**
 * Returns the annualized cumulative return of an asset
 * of an asset.
 *
 * @remarks
 * More information:
 * 	https://www.investopedia.com/terms/a/annualized-total-return.asp
 */
export function calcAnnualReturn(returns: number, daysHeld: number): number {
  return Math.pow(1 + returns, 365 / daysHeld) - 1;
}
