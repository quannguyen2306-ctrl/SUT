import flipAvailability from "./flipAvailability";

export default function calculateTops(data, start, workingHours) {
    const gapDistance = 40;
    let topDistance = 129

    const flippedData = flipAvailability(data)

    const newArray = flippedData.map((item) => {
        return topDistance + (item - start) * gapDistance
    })

    return newArray
}