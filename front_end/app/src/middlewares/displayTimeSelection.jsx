import reverseGap from "./reverseGap"
function displayTimeSelection(timeSelection) {
    const start = reverseGap(timeSelection[0])
    const end = reverseGap(timeSelection[timeSelection.length - 1])
    const result = `${start.startHour}:${String(start.startMinute).padStart(2, "0")} - ${end.endHour}:${String(end.endMinute).padStart(2, "0")}`
    return result
}

export default displayTimeSelection;