/**
 * Calculates the sum of a vector
 */
export function calcSum(vals: number[]): number {
  let sum = 0;
  for (const val of vals) {
    sum += val;
  }
  return sum;
}

/**
 * Calculates the mean of a list a vector
 */
export function calcMean(vals: number[]): number {
  const sum = calcSum(vals);
  return sum / vals.length;
}

/**
 * Calculates the deviance of each value from the mean
 * @returns deviance off mean
 */
export function calcDeviance(vals: number[], mean?: number): number[] {
  if (mean === undefined) {
    mean = calcMean(vals);
  }
  const devs = new Array(vals.length);
  for (let i = 0; i < vals.length; i++) {
    devs[i] = vals[i] - mean;
  }
  return devs;
}

/**
 * Calculates the variance for a set of numbers
 * @param vals vector of values
 * @param devs optional deviance of each value
 * @param mean optional mean
 * @returns variance for values
 */
export function calcVariance(vals: number[], devs?: number[], mean?: number): number {
  if (!devs) {
    devs = calcDeviance(vals, mean);
  }
  let sum = 0;
  for (let i = 0; i < devs.length; i++) {
    sum += Math.pow(devs[i], 2);
  }
  const n = devs.length - 1;
  return sum / n;
}

/**
 * Calculates the standard deviation for a set of values
 */
export function calcStdDev(vals: number[], variance?: number): number {
  if (variance === undefined) {
    variance = calcVariance(vals);
  }
  return Math.sqrt(variance);
}

/**
 * Returns the z-score for a given value against the mean and standard
 * deviation
 */
export function calcZScore(x: number, mean: number, stddev: number): number {
  return (x - mean) / stddev;
}
