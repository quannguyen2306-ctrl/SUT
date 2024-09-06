import { v4 as uuidv4 } from 'uuid'
import User from '../../../Model/User.model.js'
import Owner from '../../../Model/Owner.model.js'
import Chat from '../../../Model/Chat.model.js'

async function addMessageToChat(chatId, message) {
    try {
        // Update MongoDB
        const result = await Chat.updateOne(
            { _chatId: chatId },
            { $push: { chat: message } }
        );

        // Check if the update was successful
        if (result.nModified === 0) {
            throw new Error('Chat not found or message not added');
        }

        console.log('Message added to chat successfully');

    } catch (error) {
        console.error('Error adding message to chat:', error.message);
        throw error;
    }
}

export const resolvers = {
    Mutation: {
        sendMessage: async (_, { body }, { pubsub }) => {
            const { content, _senderId, _recipentId, _roomId } = body
            const newMsgId = uuidv4()

            const userQuery = async () => {
                const senderQuery = body.owner
                    ? { _ownerId: _senderId }
                    : { _userId: _senderId };

                const recipientQuery = body.owner
                    ? { _userId: _recipentId }
                    : { _ownerId: _recipentId };

                const result = {
                    sender: await (body.owner ? Owner : User).findOne(senderQuery, ['name']),
                    recipent: await (body.owner ? User : Owner).findOne(recipientQuery, ['name']),
                };

                return result;
            };

            const users = await userQuery();

            const newData = {
                _msgId: newMsgId,
                content: content,
                sender: {
                    _id: _senderId,
                    name: users.sender.name
                },
                recipent: {
                    _id: _recipentId,
                    name: users.recipent.name
                },
                timestamp: new Date()
            };

            const message = { message: newData };
            const channel = `MESSAGE_ADDED-${_roomId}`;

            const result = {}

            try {
                // await redis.rpush(_roomId, JSON.stringify(message))
                pubsub.publish(channel, message)

                result.success = true
                result.message = content
                result.error = "No error"

            } catch (error) { 
                console.error('Error sending message:', error.message);
                result.success = false
                result.error = error.message
            }

            addMessageToChat(_roomId, newData)
            return result

        },

        // Create new room 
        createRoom: async (_, { body }) => {
            try {
                const { _senderId, _recipentId } = body;
                const newChatId = uuidv4();
                const newChatRoom = new Chat({
                    _chatId: newChatId,
                    _membersId: [_senderId, _recipentId],
                    chat: [],
                    active: true,
                });

                await newChatRoom.save();
                return "Successfully created a new chat room";

            } catch (error) {
                console.error('Error creating room:', error.message);
                throw new Error('Error creating room: ' + error.message);
            }
        }


    },
    Subscription: {
        messageSent: {
            subscribe: async (_, { body }, { pubsub }) => {
                const { _senderId, _recipentId } = body;
                const chatRoom = await Chat.findOne({
                    _membersId: { $all: [_senderId, _recipentId] },
                    active: true
                })
                const asyncIterator = pubsub.asyncIterator(`MESSAGE_ADDED-${chatRoom._chatId}`);
                return asyncIterator;

            },
            resolve: (payload) => {
                console.log(payload.message.content)
                return payload.message
            },
        },
    },
    Query: {
        getAllMessage: async (_, { _roomId }) => {
            try {
                // Find all chats and sort them in reverse order based on the latest message's timestamp
                const chats = await Chat.findOne({ _chatId: _roomId}, ['chat']).exec();
                const result = chats.chat.reverse();
                console.log(result);
                return result;
            } catch (error) {
                console.error('Error fetching chats:', error.message);
                throw error;
            }

        }

    }

}