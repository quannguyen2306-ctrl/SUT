function seperateArrays(arr) {
    if (arr.length === 0) {
        return [];
    }

    let result = [];
    let currentSubarray = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] + 1) {
            currentSubarray.push(arr[i]);
        } else {
            result.push(currentSubarray);
            currentSubarray = [arr[i]];
        }
    }

    result.push(currentSubarray);

    return result;
}

export default seperateArrays