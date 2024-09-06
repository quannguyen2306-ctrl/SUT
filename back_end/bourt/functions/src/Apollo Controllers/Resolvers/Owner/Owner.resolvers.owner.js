import Owner from '../../../Model/Owner.model.js'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
    Query: {
        /** get an owner information with param _ownerId
            * @param {Object} args {
                _ownerId: String
            * }
            * @returns {Array} 
        */
        getOwner: async (parent, args) => {
            try {
                const result = await Owner.findOne({_ownerId: args._ownerId})
                return result

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },
    },

    Mutation: {
        /** create an owner with param body
            * @param {Object} args {
                body: {
                    name: String,
                    email: String,
                    phoneNumber: String,
                    dob: String,
                }
            * }
            * @returns {String} _ownerId, save to localStorage in client pls
        */
        createOwner: async (parent, args) => {
            const _ownerId = uuidv4()
            try {
                const newOwner = new Owner({ _ownerId: _ownerId, ...args.body })
                newOwner.save()

                return _ownerId;
            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        /** update an owner information with params _ownerId, body
            * @param {Object} args {
                body: {
                    name: String,
                    email: String,
                    phoneNumber: String,
                    dob: String,
                }
            * }
            * @returns {String} status 
        */
        updateOwner: async (parent, args) => {
            try {
                await Owner.findOne({ _ownerId: args._ownerId })
                    .then(owner => {
                        owner.name = args.body.name;
                        owner.email = args.body.email;
                        owner.phoneNumber = args.body.phoneNumber;
                        owner.dob = args.body.dob;
                        owner.save();
                    })

                return "Owner updated!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

        /** delete an owner with param _ownerId
            * @param {Object} args {
                _ownerId: String
            * }
            * @returns {String} status 
        */
        deleteOwner: async (parent, args) => {
            try {
                await Owner.findOneAndDelete({ _ownerId: args._ownerId })
                return "Owner deleted!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        }
    }
}

