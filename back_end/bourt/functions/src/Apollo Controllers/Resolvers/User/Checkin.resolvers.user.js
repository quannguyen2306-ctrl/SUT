import Booking from "../../../Model/Booking.model.js"
import { reverseGap } from '../../../Common/gap.common.js'

export const resolvers = {
    Query: {
        getStatusCheckin: async (parent, args) => {
            const booking = await Booking.findOne({ _bookingId: args._bookingId });
            const currentTime = new Date()

            const start = reverseGap(booking.timeSelection[0])
            const end = reverseGap(booking.timeSelection[booking.timeSelection.length - 1])

            const bookingDate = new Date(booking.date)
            console.log('testing1', bookingDate.getDate() == booking.date.getDate(), bookingDate.getDate(), bookingDate.getHours(),booking.date.getDate(), booking.date.getHours()) ; 
            console.log('testing2', bookingDate === booking.date);
            const startTime = new Date(booking.date.getFullYear(), booking.date.getMonth(), booking.date.getDate(), start.startHour, start.startMinute)
            const endTime = new Date(booking.date.getFullYear(), booking.date.getMonth(), booking.date.getDate(), end.endHour, end.endMinute)


            console.log({
                args,
                booking,
                currentTime,
                start,
                end,
                bookingDate,
                startTime,
                endTime,
                verify: currentTime >= startTime && currentTime <= endTime && booking.cancelled == false
            })

            if (currentTime >= startTime && currentTime <= endTime && booking.cancelled == false) { // if valid to check in
                booking.checkIn = true
                booking.transactionStatus = 'pending'
                booking.save()
                return true;
            } else {
                return false;
            }
        }
    }
}