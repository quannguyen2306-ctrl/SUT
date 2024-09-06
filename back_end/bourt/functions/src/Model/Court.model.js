import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courtSchema = new Schema({
    _ownerId: {
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
        trim: true,
        index: "searchCourtName"
    },
    categories: {
        type: [String],
        default: [],
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    utility: {
        type: [String],
        default: [],
    },
    location: {
        type: {
            latitude: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            }
        },
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    variableCost: {
        type: Number,
    },
    workingHours: {
        type: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        required: true
    },
    maxSCourt: { 
        type: Number, 
        required: true
    },
    rating: {
        type: {
            totalRating: {
                type: Number,
            },
            sumRating: {
                type: Number,
            }
        },
        default: {
            totalRating: 0,
            sumRating: 0
        }
    },
    image: {
        type: [String],
        default: [],
    },
    depositPercentage: {
        type: Number, // 50 stands for 50%
        required: true
    },
    inactive: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Court = mongoose.model('Court', courtSchema);
export default Court