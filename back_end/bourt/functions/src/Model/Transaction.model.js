import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    _courtId: {
        type: String,
        default: 0
    },
    type: { //deposit, restDeposit
        type: String,
        required: true
    },
    _bookingId: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction