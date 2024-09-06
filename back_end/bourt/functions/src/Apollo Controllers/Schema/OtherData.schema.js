export const typeDefs = `#graphql
    type OtherData {
        _id: ID!
        sports: [String!]
        sportIcons: [String!]
    }

    type Query {
        getOtherData(): OtherData!
    }
`