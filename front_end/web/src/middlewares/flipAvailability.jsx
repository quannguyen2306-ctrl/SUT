export default function flipAvailability(sortedRandomNumbers) {
    const numbersSet = new Set(sortedRandomNumbers);
    const arr = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
    const allNumbersSet = new Set(arr);
    const remainingNumbersSet = new Set([...allNumbersSet].filter(num => !numbersSet.has(num)));
    const remainingNumbers = Array.from(remainingNumbersSet);

    return remainingNumbers
}