

export const typeDefs = `#graphql
    type Availability { 
        date: String!
        _courtId: String!
        availability: [Int!]
    }

   type ResponseAvailability { 
        _courtId: String!
        day: Int! 
        month: Int!
        year: Int!
   }


    type AvailabilityTime { 
        _courtId: String!
        date: String
        gapNumber: Int!
        lock: Boolean
    }

    type Query { 
        availabilityCourtDaily(_courtId: ID!, day: Int!, month: Int!, year: Int!): Availability
    }

    input InputAvailabilityCourtUpdated {
        day: Int!
        month: Int!
        year: Int!
        gapList: [Int!]
        condition: String!
    }

    type Subscription { 
        availabilityCourtUpdateDaily(_courtId: ID!, day: Int!, month: Int!, year: Int!): Availability
        testYield: String
    }

    type StatusResponse {
        success: Boolean!
        message: String
        errors: [Error]
    }

    type Error {
        message: String!
        code: String!
    }

    type Mutation { 
        updateAvailabilityDaily(_courtId: ID!, body: InputAvailabilityCourtUpdated!) : StatusResponse!
    }
`





