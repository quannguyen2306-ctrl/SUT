export default function convertTo12HourFormat(time24) {
    // Split the time string into hours and minutes
    let splitTime = time24.split(':');
    let hours = parseInt(splitTime[0]);
    let minutes = splitTime[1];

    // Determine AM or PM
    let period = (hours >= 12) ? "PM" : "AM";

    // Convert to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12; // 0:00 is equivalent to 12:00 AM
    }

    // Add leading zero if needed for minutes
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // Construct the 12-hour format time string
    let time12 = hours + ":" + minutes + " " + period;

    return time12;
}