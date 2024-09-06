import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const otherDataSchema = new Schema({
    sports: {
        type: [String],
        default: [],
    },
    sportIcons: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// userId --> find array favorites --> 

const OtherData = mongoose.model('OtherData', otherDataSchema);
export default OtherData