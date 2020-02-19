export class Normal {
  /**
   * Standard normal distribution has mean=0 and stddev=1
   */
  public static standard: Normal = new Normal(0, 1);

  /**
   * Calculates the error function at x based on the
   * Python Math.erf implementation
   * https://docs.python.org/2/library/math.html#math.erf
   * @param x
   */
  public static erf(x: number): number {
    // save the sign of x
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    // constants
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
  }

  /**
   * Mean of this distribution
   */
  public mean: number;

  /**
   * Stadard deviation for this distribution
   */
  public stddev: number;

  /**
   * Variance for this distribution
   */
  public variance: number;

  /**
   * Creates a normal distrubtion with the supplied mean and
   * standard deviation.
   *
   * @remarks https://en.wikipedia.org/wiki/Normal_distribution
   * @param mean
   * @param stddev
   */
  constructor(mean: number, stddev: number) {
    this.mean = mean;
    this.stddev = stddev;
    this.variance = stddev * stddev;
    this.cdf = this.cdf.bind(this);
    this.pdf = this.pdf.bind(this);
  }

  /**
   * Calculates the approximation of the CDF.
   * @param x value
   * @returns approximate CDF
   */
  cdf(x: number): number {
    const { mean, stddev } = this;
    const erf = Normal.erf;
    return 0.5 * (1 + erf((x - mean) / (stddev * Math.sqrt(2))));
  }

  /**
   * Calculates the derivative of the CDF, the PDF.
   * @param x value
   * @returns the PDF value
   */
  pdf(x: number): number {
    const { mean, variance } = this;
    return Math.exp(-Math.pow(x - mean, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance);
  }
}
