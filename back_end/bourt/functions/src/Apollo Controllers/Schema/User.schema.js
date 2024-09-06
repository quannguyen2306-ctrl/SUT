export const typeDefs = `#graphql
    type User {
        _id: ID!
        _userId: String!
        name: String!
        email: String!
        phoneNumber: String!
        dob: String!
        address: String!
    }

    input InputUser {
        name: String!
        email: String!
        phoneNumber: String!
        dob: String!
        address: String!
    }

    type Court {
        _id: ID
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
        maxSCourt: Int!,
        workingHours: WorkingHours!
        rating: Rating!
        image: [String!]
        inactive: Boolean!
    }

    # type Status {
    #     success: Boolean!
    #     message: String!
    # }

    input InputLimitParams {
        start: Int
        end: Int
    }

    type Query {
        getUser(_userId: String!): User!
        getFavorites(_userId: String!, params: InputLimitParams!): [Court!]
        isFavorite(_userId: String!, _id: String!): Boolean!
    }

    type Mutation {
        createUser(body: InputUser!): String! # Return _userId
        updateUser(_userId: String!, body: InputUser!): String! # Return success or not
        deleteUser(_userId: String!): String! # Return success or not

        # favorites
        createFavorite(_userId: String!, _courtId: String!): String! # Return success or not
        deleteFavorite(_userId: String!, _id: String!): String! # Return success or not
    }
`