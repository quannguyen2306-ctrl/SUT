export const calculateGap = (startTime, endTime) => {
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

// function calculateGap(gaps) {
//     let gapArr = [];
//     const start = new Date(courtData.workingHours.start)
//     const end = new Date(courtData.workingHours.end)

//     if (end > start) {
//         const difference = Math.abs(end - start) / (1000 * 60); // return in minutes
//         const n = difference / 30
//         let current = start;
//         for (let i = 0; i < n; i++) {
//             let hourFromStart = parseFloat(current.getHours()) + parseFloat(current.getMinutes()) / 60
//             let gap = hourFromStart * 2 + 1
//             gapArr.push(gap)
//             current.setMinutes(current.getMinutes() + 30)
//         }
//     } else {
//         throw Error("Invalid startTime and endTime");
//     }

//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//     const currentTimeFraction = hours + minutes / 60;

//     const gapId = Math.ceil(currentTimeFraction * 2);

//     const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

//     let min = gapArr[0]

//     if (date <= endOfToday && min < gapId) {
//         min = gapId
//     }

//     const max = gapArr[gapArr.length - 1]
//     const newArr = gaps.filter(item => item >= min && item <= max);
//     return newArr

// }