export const typeDefs = `#graphql 
    type Bookings {
        _bookingId: String!
        userName: String!
        userPhone: String!
        amountDue: Int!
        courtAssignment: String!
    }

    type Query {
        getStatusCheckin(_bookingId: String!): Boolean
        getPendings(_courtId: String!): [Bookings!]
    }
`