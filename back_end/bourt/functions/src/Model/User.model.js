import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// userId --> find array favorites --> 

const User = mongoose.model('User', userSchema);
export default User