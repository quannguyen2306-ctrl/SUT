import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _commentId: {
        type: String,
    },
    _courtId: {
        type: String,
    },
    _userId: {
        type: String,
    },
    name: { 
        type: String,
    },
    rating: { 
        type: Number,
    },
    comment: { 
        type: String, 
    },
    commentDate: {
        type: String, 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment