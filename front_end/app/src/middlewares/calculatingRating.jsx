export default function calculatingRating(ratingObj) {
    if (ratingObj.totalRating !== 0) {
        const rating = ratingObj.sumRating / ratingObj.totalRating
        return Math.round(rating * 10) / 10
    } else {
        return 0
    }
}