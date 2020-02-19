import { Normal } from "./stats-normal";

export class Lognormal {
  public readonly mean: number;
  public readonly stddev: number;
  public readonly variance: number;

  /**
   * Creates a lognormal distribution with the supplied mean and standard deviation
   * @remarks
   * Refer to https://en.wikipedia.org/wiki/Log-normal_distribution
   *
   * @param mean
   * @param stddev
   */
  constructor(mean: number, stddev: number) {
    this.mean = mean;
    this.stddev = stddev;
    this.variance = stddev * stddev;
    this.cdf = this.cdf.bind(this);
    this.pdf = this.pdf.bind(this);
    this.zvalue = this.zvalue.bind(this);
  }

  /**
   * Calculates the approximation of the CDF.
   * @param x
   * @returns
   */
  cdf(x: number): number {
    const { mean: mu, stddev: sigma } = this;
    const erf = Normal.erf;
    return (1 / 2) * (1 + erf((Math.log(x) - mu) / (sigma * Math.SQRT2)));
  }

  /**
   * Calculates the derivative of the CDF, the PDF.
   * @param x
   * @returns
   */
  pdf(x: number): number {
    const { mean: mu, stddev: sigma } = this;
    return (
      (1 / x) *
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma))
    );
  }

  /**
   * Returns the value of X at the specific z-score. This is useful
   * for retrieving the values at say -1, 0, and 1 standard deviation.
   * @param zscore
   * @returns
   */
  zvalue(zscore: number): number {
    const { mean, stddev } = this;
    return Math.exp(mean + zscore * stddev);
  }
}
