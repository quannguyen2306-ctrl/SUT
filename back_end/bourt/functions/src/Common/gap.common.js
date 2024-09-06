/**
 * 
 * @param {String} startTime 
 * @param {String} endTime 
 * @returns {Array}
 */
export const calcGap = (startTime, endTime) => {
    console.log(startTime, endTime)
    let gapArr = new Array();
    const start = new Date(startTime)
    const end = new Date(endTime)
    if (end > start) {
        const difference = Math.abs(end - start) / (1000 * 60); // return in minutes
        const n = difference / 30
        let current = start;
        for (let i = 0; i < n; i++) {
            let hourFromStart = parseFloat(current.getHours()) + parseFloat(current.getMinutes()) / 60
            let gap = hourFromStart * 2 + 1
            gapArr.push(gap)
            current.setMinutes(current.getMinutes() + 30)
        }
    } else {
        console.log(start, end)
        throw "Invalid startTime and endTime";
    }
    return gapArr;

}

/**
 * 
 * @param {Int} gapId 
 * @returns {Object}
 */
export const reverseGap = (gapId) => {
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


//Testing code 
// start = new Date()
// start.setHours(8)
// start.setMinutes(30)

// end = new Date()
// end.setHours(10)
// end.setMinutes(0)
// calcGap(start, end)


// console.log(new Date(2023, 10, 25, 5))
// console.log(new Date(2023, 10, 25, 21))


