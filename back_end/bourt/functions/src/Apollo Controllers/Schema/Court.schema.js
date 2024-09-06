export const typeDefs = `#graphql
    type Location {
        latitude: String!
        longitude: String!
    }
    
    type WorkingHours {
        start: String!
        end: String!
    }
    
    type Rating {
        totalRating: Int!
        sumRating: Int!
    }

    type Court {
        _id: ID!
        _ownerId: String!
        _courtId: String!
        courtName: String!
        categories: [String!]
        address: String!
        description: String!
        utility: [String!]
        location: Location
        pricePerHour: Int!
        variableCost: Int
        workingHours: WorkingHours!
        depositPercentage: Int!
        maxSCourt: Int!
        rating: Rating!
        image: [String!]
    }
    
    input InputLimitParams {
        start: Int
        end: Int
    }

    input InputLocation {
        latitude: String!
        longitude: String!
    }

    input InputWorkingHours {
        start: String!
        end: String!
    }

    input InputRating {
        totalRating: Int!
        sumRating: Int!
    }

    input InputCourt {
        courtName: String!
        categories: [String!]
        address: String!
        description: String!
        utility: [String!]
        location: InputLocation!
        pricePerHour: Int!
        variableCost: Int
        workingHours: InputWorkingHours!
        depositPercentage: Int!
        maxSCourt: Int!
        image: [String!]
    }

    type Query {
        # User
        courts(params: InputLimitParams!): [Court!]
        singleCourt(_courtId: String!): Court!
        searchCourts(searchInput: String!): [Court!]

        # Owner
        owner_singleCourt(_ownerId: String!): Court!
    }

    type Mutation {
        # User
        addRating(_courtId: String!, rating: Int!): Court!
        # deleteRating(_courtId: String!, rating: Int!): String!
     
        # Owner
        owner_createCourt(_ownerId: String!, body: InputCourt!): String!
        owner_updateCourt(_ownerId: String!, body: InputCourt!): String!
        owner_deleteCourt(_ownerId: String!): String!
    }
  
`

// All dates are casted to String, pls new Date() before using

// create owner account ==> use that id and  to create court