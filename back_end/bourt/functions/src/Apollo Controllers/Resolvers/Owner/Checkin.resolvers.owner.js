import Booking from "../../../Model/Booking.model.js"

export const resolvers = {
    Query: {
        getPendings: async (parent, args) => {
            try {
                const booking = await Booking.find({ _courtId: args._courtId, transactionStatus: 'pending' })
                const result = booking.map(item => {
                    return {
                        amountDue: item.totalPrice - item.depositedAmount,
                        _bookingId: item._bookingId,
                        userName: item.userName,
                        userPhone: item.userPhone,
                        courtAssignment: item.courtAssignment
                    }
                })

                return result
            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        }
    }
}