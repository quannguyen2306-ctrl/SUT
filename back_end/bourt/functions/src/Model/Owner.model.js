import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    _ownerId: {
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner