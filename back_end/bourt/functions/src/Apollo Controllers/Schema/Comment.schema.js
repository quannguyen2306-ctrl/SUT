export const typeDefs = `#graphql
    type Comment {
        _id: ID!
        _commentId: String!
        _courtId: String!
        _userId: String!
        name: String!
        rating: Int! 
        comment: String!
        commentDate: String!
        createdAt: String!
    }

    input InputComment {
        _courtId: String!
        _userId: String!
        rating: Int! 
        comment: String!
        commentDate: String!
    }

    input InputLimitParams {
        start: Int
        end: Int
    }

    type Query {
        getComments(_courtId: String!, params: InputLimitParams!): [Comment!]
    }

    type Mutation {
        createComment(body: InputComment): String! # Status
        deleteComment(_commentId: String!): String! # Status
    }
`