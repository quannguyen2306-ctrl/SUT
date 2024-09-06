export const typeDefs = `#graphql
    type Statistics {
        bookings: Int!
        revenue: Int!
        owe: Int!
    }

    type Query {
        getStatistics(_courtId: String!, queryType: String!, date: String!): Statistics!
    }

    # queryType: day, month
`