/**
 * The function finds pairs of numbers from an array that add up to a given total.
 * @param {number[]} numbers - an array of numbers that we want to find pairs from
 * @param {number} total - The `total` parameter is a number representing the target sum that we want
 * to find pairs of numbers that add up to it.
 * @returns The function `findPaisByTotal` is returning an array of arrays, where each inner array
 * contains two numbers that add up to the `total` parameter passed to the function. The inner arrays
 * represent pairs of numbers from the `numbers` array that add up to the `total`.
 */

export default function findPaisByTotal(
  numbers: number[],
  total: number
): number[][] {
  if (total < 0) {
    throw new Error('Target sum must be non-negative')
  }

  const pairs: number[][] = []
  const numSet: Set<number> = new Set()

  for (const num of numbers) {
    const complement = total - num
    if (numSet.has(complement) && !pairExists(pairs, num, complement)) {
      pairs.push([num, complement])
    }
    numSet.add(num)
  }

  return pairs
}

/**
 * The function checks if a pair of numbers exists in an array of pairs.
 * @param {number[][]} pairs - an array of arrays, where each inner array contains two numbers
 * representing a pair
 * @param {number} num1 - The first number to check for in the pairs array.
 * @param {number} num2 - `num2` is a number parameter that is used in the `pairExists` function. It is
 * one of the two numbers that the function checks for in each pair of numbers in the `pairs` array.
 * The function returns `true` if a pair exists in the `pairs` array that
 * @returns The function `pairExists` is returning a boolean value (`true` or `false`) depending on
 * whether a pair of numbers (`num1` and `num2`) exists in the given array of pairs (`pairs`). If the
 * pair exists, the function returns `true`, otherwise it returns `false`.
 */

function pairExists(pairs: number[][], num1: number, num2: number): boolean {
  for (const pair of pairs) {
    if (
      (pair[0] === num1 && pair[1] === num2) ||
      (pair[0] === num2 && pair[1] === num1)
    ) {
      return true
    }
  }
  return false
}
