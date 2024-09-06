import { v4 as uuidv4 } from 'uuid'

import { rate } from '../../../Common/constants.common.js';

import Court from '../../../Model/Court.model.js'
import Booking from '../../../Model/Booking.model.js';

export const resolvers = {
    Query: {
        getCourtBookings: async (parent, args) => {
            try {
                return await Booking.find({ _courtId: args._courtId })
                    .skip(args.params.start)
                    .limit(args.params.end - args.params.start)
            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
        getComingBookingsToday: async (parent, args) => {
            try {
                const targetDate = new Date()
                return await Booking.find({
                    _courtId: args._courtId,
                    date: {
                        $gte: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0),
                        $lt: new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1, 0, 0)
                    },
                    $and: [
                        { transactionStatus: { $ne: "pending" } },
                        { transactionStatus: { $ne: "finished" } },
                        { cancelled: false }
                    ]

                })
                    .sort({ date: 'ascending' })
                    .skip(args.params.start)
                    .limit(args.params.end - args.params.start)
            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
        searchCourtBookings: async (parent, args) => {
            const searchTerm = args.searchInput
            try {
                return await Booking.aggregate([
                    {
                        $search: {
                            "index": "searchCourtBookings",
                            "text": {
                                "query": searchTerm,
                                "path": ["userName", "userPhone"],
                                "fuzzy": {}
                            }
                        },
                    }
                ]).limit(10)

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
    },
    Mutation: {
        setTransactionStatus: async (parent, args) => {
            await Booking.findOne({ _bookingId: args._bookingId }).then(booking => {
                booking.transactionStatus = 'finished'
                booking.save()
            })

            return "success"
        }
    }
}

