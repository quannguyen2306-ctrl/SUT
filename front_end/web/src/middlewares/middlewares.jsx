function reverseGap(gapId) {
    const start_gap = (gapId - 1) / 2
    const start_hour = Math.floor(start_gap)
    const start_minute = (start_gap - start_hour) * 60

    const end_gap = gapId / 2
    const end_hour = Math.floor(end_gap)
    const end_minute = (end_gap - end_hour) * 60

    const value = {
        startHour: start_hour,
        startMinute: start_minute,
        endHour: end_hour,
        endMinute: end_minute
    }
    return value
}

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

export {reverseGap, seperateArrays}