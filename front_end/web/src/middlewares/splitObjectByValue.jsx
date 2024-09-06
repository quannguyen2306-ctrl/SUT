export default function splitObjectByValue(obj) {
    let array = []
    let courtNumber
    let timeSelection

    for (const [key, value] of Object.entries(obj)) {
        if (value !== courtNumber) {
            courtNumber = value;
            timeSelection = [key]
            array.push({
                timeSelection: timeSelection,
                courtNumber: courtNumber
            })
        } else {
            array[array.length - 1].timeSelection.push(key)
        }
    }

    return array
}