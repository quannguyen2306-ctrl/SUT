import { v4 as uuidv4 } from 'uuid'

import { rate } from '../../../Common/constants.common.js';

import Court from '../../../Model/Court.model.js'
import User from '../../../Model/User.model.js'
import Booking from '../../../Model/Booking.model.js';

export const resolvers = {
    Query: {
        getBookings: async (parent, args) => {
            // 3-5
            try {
                return await Booking.find({ _bookerId: args._bookerId })
                    .skip(args.params.start)
                    .limit(args.params.end - args.params.start)
                    .sort({ date: 'descending' })
            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
        getSingleBooking: async (parent, args) => {
            try {
                return await Booking.findOne({ _bookingId: args._bookingId })
            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        }
    },

    Mutation: {
        // only create booking after succesfully paid --> run this function on payment server hò hò
        createBooking: async (parent, args) => {
            const _bookingId = uuidv4()

            // args___________________
            // _userId: String!
            // _courtId: String!

            // timeSelection: [Int!]
            // date: String! # this is date of timeSelection

            // totalPrice: Int!
            // depositedAmount: Int!

            // paymentMethod: String!

            function assignTheShit(timeSelection) {
                let obj = {}

                for (let i = 0; i < timeSelection.length; i++) {
                    obj[timeSelection[i]] = i + 1
                }

                return JSON.stringify(obj);
            }

            try {
                await Court.findOne({ _courtId: args.body._courtId }).then(
                    async court => {
                        console.log(args)
                        const newBooking = new Booking({
                            _bookingId: _bookingId,
                            courtName: court.courtName,
                            address: court.address,
                            image: [court.image[0]],
                            owe: args.body.paymentMethod !== "đặt cọc qua chủ sân" ? args.body.depositedAmount - (args.body.totalPrice * rate) : 0,
                            date: new Date(args.body.date),
                            ...args.body,
                            courtAssignment: assignTheShit(args.body.timeSelection),
                        })
                        newBooking.save()
                    }
                )

                return _bookingId;

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        cancelBooking: async (parent, args) => {
            try {
                await Booking.findOne({ _bookingId: args._bookingId })
                    .then(order => {
                        order.cancelled = true
                        order.save();
                    })

                // alert cancelled

                // free up availability

                return "Booking cancelled"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
    }
}

