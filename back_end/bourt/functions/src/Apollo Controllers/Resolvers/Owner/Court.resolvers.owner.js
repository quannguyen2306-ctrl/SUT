import { error } from 'firebase-functions/logger'
import Court from '../../../Model/Court.model.js'
import { Availability } from '../../../Services/Availability.services.js'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
    Query: {
        /** get owner's court with param _courtId
            * @param {Object} args {
                _courtId: String
            * }
            * @returns {Array}
        */
        owner_singleCourt: async (parent, args) => {
            try {
                const result = await Court.findOne({ _ownerId: args._ownerId, deleted: false })
                return result

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

    },

    Mutation: {
        /** create a court with param _ownerId
            * @param {Object} args {
                _ownerId: String
            * }
            * @returns {String} status 
        */
        owner_createCourt: async (parent, args) => {
            try {
                const _courtId = uuidv4();
                const newCourt = new Court({ _ownerId: args._ownerId, _courtId: _courtId, ...args.body })
                newCourt.save()

                return "Court added!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

        /** update a court with param _ownerId, body
            * @param {Object} args {
                _ownerId: String,
                body: {
                    courtName: String,
                    categories: [String],
                    address: String,
                    description: String,
                    utility: [String],
                    location: Object,
                    pricePerHour: Int,
                    variableCost: Int,
                    workingHours: Object,
                    maxSCourt: Int,
                    rating: Object,
                    image: [String],
                * }
            * }
            * @returns {String} status 
        */
        owner_updateCourt: async (parent, args) => {
            try {
                await Court.findOne({ _ownerId: args._ownerId })
                    .then(court => {
                        court.courtName = args.body.courtName;
                        court.categories = args.body.categories;
                        court.address = args.body.address;
                        court.description = args.body.description;
                        court.utility = args.body.utility;
                        court.location = args.body.location;
                        court.pricePerHour = args.body.pricePerHour;
                        court.depositPercentage = args.body.depositPercentage;
                        court.variableCost = args.body.variableCost;
                        court.workingHours = args.body.workingHours;
                        court.maxSCourt = args.body.maxSCourt;
                        court.rating = args.body.rating;
                        court.image = args.body.image;
                        court.save()
                    })

                return "Court updated!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

        /** delete a court with param _ownerId
            * @param {Object} args {
                _ownerId: String
            * }
            * @returns {String} status 
        */
        owner_deleteCourt: async (parent, args) => {
            try {
                await Court.findOne({ _ownerId: args._ownerId })
                    .then(court => {
                        court.deleted = true;
                        court.save()
                    })
                return "Court deleted!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        }
    }
}