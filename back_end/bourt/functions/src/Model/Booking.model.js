import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    _bookingId: {
        type: String,
        required: true
    },
    _bookerId: {
        type: String,
        required: true
    },
    _courtId: {
        type: String,
        required: true
    },
    courtName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: [String],
        default: [],
    },
    userName: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    timeSelection: {
        type: [Number],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    courtAssignment: {
        type: String,
        required: true
    },
    depositedAmount: {
        type: Number,
        required: true
    },
    owe: {
        type: Number,
        required: true
    },
    paymentMethod: { // chuyen khoan, credit card, ...
        type: String,
        required: true
    },
    promotions: {
        type: [String],
    },
    transactionStatus: {
        type: String,
        default: 'deposited'
    },
    checkIn: {
        type: Boolean,
        default: false,
        required: true
    },
    cancelled: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking