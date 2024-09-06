import mongoose from 'mongoose';

const Schema = mongoose.Schema;



const msgSchema = new Schema({ 
    _msgId: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true
    }, 
    sender: { 
        type: { 
            _id:{ 
                type: String,
                required: true 
            }, 
            name: { 
                type: String, 
                required: true 
            }
        }, 
        required: true
    }, 
    recipent: { 
        type: { 
            _id:{ 
                type: String,
                required: true 
            }, 
            name: { 
                type: String, 
                required: true 
            }
        }, 
        required: true
    },
    timestamp: { 
        type: String, 
        required: true
    }
})

const chatSchema = new Schema({
    _chatId: { 
        type: String, 
        required: true
    }, 
    _membersId: { 
        type: [String], 
        required: true
    },  
    chat:  { 
        type: [msgSchema], 
    },
    active: { 
        type: Boolean, 
        reuqired: true
    }, 

});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat