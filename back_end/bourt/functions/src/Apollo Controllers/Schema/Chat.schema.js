
export const typeDefs = `#graphql

    type User { 
        name: String!
    }

    type Message { 
        _msgId: String! 
        content: String!
        sender: User!
        recipent: User!
        timestamp: String!
    }



    input SendMsgContext { 
        content: String!
        _senderId: String! 
        _recipentId: String!
        _roomId: String! 
        owner: Boolean!
    }

    input SubMsgContext { 
        _senderId: String!
        _recipentId: String!
    }

    type StatusResponse {
        success: Boolean!
        message: String
        errors: [Error]
    }

    type Query { 
        getAllMessage(_roomId: String!): [Message]
    }

    type Mutation { 
        sendMessage(body: SendMsgContext!): StatusResponse
        createRoom(body: SubMsgContext!): String
    }

    type Subscription { 
        messageSent(body: SubMsgContext!): Message!
    }


`



