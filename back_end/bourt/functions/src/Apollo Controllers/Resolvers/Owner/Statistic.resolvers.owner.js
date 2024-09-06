import { rate } from '../../../Common/constants.common.js'
import Booking from '../../../Model/Booking.model.js'
import { v4 as uuidv4 } from 'uuid'

function calculateDuration(queryType, targetDate) {
    if (queryType == 'day') {
        return {
            $gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0), 
            $lt: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1, 0, 0)
        }
    } else if (queryType == 'month') {
        console.log(targetDate)
        return {
            $gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), 1, 0, 0),
            $lt: new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1, 0, 0),
        }
    } else {
        throw new Error('illegal queryType')
    }
}

export const resolvers = {
    Query: {
        getStatistics: async (parent, args) => {
            // args: _courtId: String!, queryType: String!, date: String!
            try {
                const targetDate = new Date(args.date)

                const bookings = await Booking.countDocuments({
                    _courtId: args._courtId,
                    createdAt: calculateDuration(args.queryType, targetDate)
                })

                const money = await Booking.aggregate([
                    {
                        $match: {
                            _courtId: args._courtId,
                            createdAt: calculateDuration(args.queryType, targetDate)
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalPrice: { $sum: '$totalPrice' },
                            owe: { $sum: '$owe' }
                        },
                    },
                ])

                if (money.length > 0) {
                    return {
                        bookings: bookings,
                        revenue: money[0].totalPrice - (money[0].totalPrice * rate),
                        owe: money[0].owe
                    }
                } else {
                    return {
                        bookings: bookings,
                        revenue: 0,
                        owe: 0
                    }
                }

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },
    },
}

