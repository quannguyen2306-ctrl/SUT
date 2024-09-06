export const calculateGap = (workingHours) => {
    let gapArr = [];
    const start = new Date(workingHours.start)
    const end = new Date(workingHours.end)
 
    console.log(start.toLocaleString(), end.toLocaleString())
 
    if (start.getMinutes() === 30) {
        start.setMinutes(start.getMinutes() - 30)
    }
    end.setHours(end.getHours() + 1)
   
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
        console.log("Invalid startTime and endTime");
    }
    return gapArr;
 }