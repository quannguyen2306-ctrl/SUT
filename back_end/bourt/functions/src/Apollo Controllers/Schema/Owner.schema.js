export const typeDefs = `#graphql
    type Owner {
        _id: ID!
        _ownerId: String!
        name: String!
        email: String!
        phoneNumber: String!
        dob: String!
        createdAt: String!
    }

    input InputOwner {
        name: String!
        email: String!
        phoneNumber: String!
        dob: String!
    }

    type Query {
        getOwner(_ownerId: String!): Owner!
    }

    type Mutation {
        createOwner(body: InputOwner!): String! # Return _ownerId
        updateOwner(_ownerId: String!, body: InputOwner!): String! # Return success or not
        deleteOwner(_ownerId: String!): String! # Return success or not
    }
`