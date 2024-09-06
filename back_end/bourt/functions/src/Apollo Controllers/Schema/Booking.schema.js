export const typeDefs = `#graphql
    type Booking {
        _id: ID!
        _bookingId: String!
        _bookerId: String!
        _courtId: String!
        courtName: String!
        address: String!
        image: [String!]

        userName: String!
        userPhone: String!

        timeSelection: [Int!]
        date: String!
        courtAssignment: String!

        # courtAssignment: {
        #     20: 1,
        #     21: 1,
        #     22: 2,
        #     23: 2
        # }

        totalPrice: Int!
        depositedAmount: Int!
        owe: Int!

        paymentMethod: String!
        promotions: [String!] #id of discounts

        cancelled: Boolean!
        checkIn: Boolean!
        transactionStatus: String! # pending, finished
    }

    input InputBooking {
        _bookerId: String!
        _courtId: String!

        userName: String!
        userPhone: String!

        timeSelection: [Int!]
        date: String! # this is date of timeSelection

        totalPrice: Int!
        depositedAmount: Int!

        paymentMethod: String!
    }

    input InputLimitParams {
        start: Int
        end: Int
    }

    type Query {
        # Get bookings to view
        getBookings(_bookerId: String!, params: InputLimitParams!): [Booking!] # user/owner
        getSingleBooking(_bookingId: String!): Booking! # mainly user

        # Get all bookings in my court 
        getCourtBookings(_courtId: String!, params: InputLimitParams!): [Booking!]
        searchCourtBookings(searchInput: String!): [Booking!]

        # Get today's bookings
        getComingBookingsToday(_courtId: String!, params: InputLimitParams!): [Booking!]

    }

    type Mutation {
        createBooking(body: InputBooking!): String!
        cancelBooking(_bookingId: String!): String! # Return success or not

        setTransactionStatus(_bookingId: String!): String! # set pending to finished
    }
`