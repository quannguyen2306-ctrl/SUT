export default function getNextDay() {
    let currentDate = new Date();
    let dateArray = [];
    dateArray.push(currentDate);
    for (let i = 1; i <= 6; i++) {
        let nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        dateArray.push(nextDate);
    }
    return dateArray
}