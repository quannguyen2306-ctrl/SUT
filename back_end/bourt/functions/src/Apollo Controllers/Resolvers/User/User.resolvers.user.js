import { ObjectId } from 'mongodb'
import Court from '../../../Model/Court.model.js'
import User from '../../../Model/User.model.js'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
    Query: {
        /** get an user information with param _userId
            * @param {Object} args {
                _userId: String
            * }
            * @returns {Array} 
        */
        getUser: async (parent, args) => {
            try {
                return await User.findOne({ _userId: args._userId })
            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        /** user get their favorite courts with params _userId
            * @param {Object} args {
                    _userId: String
                }
            * }
            * @returns {String} status 
        */

        getFavorites: async (parent, args) => {
            try {
                const favoriteCourts = await User
                    .findOne({ _userId: args._userId })
                    .populate('favorites')
                    .exec()
                    .then(res => res.favorites)

                const skip = args.params.start;
                const limit = args.params.end;

                const paginatedFavorites = favoriteCourts.slice(skip, skip + limit);

                return paginatedFavorites;

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },

        isFavorite: async (parent, args) => {
            try {
                const result = await User.findOne({ _userId: args._userId })
                const _id = new ObjectId(args._id)
                let respond = false
                result.favorites.forEach(item => {
                    if (String(item) == String(_id)) {
                        respond = true
                    }
                })
                return respond

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
    },

    Mutation: {
        /** create an user with param body
            * @param {Object} args {
                body: {
                    name: String,
                    email: String,
                    phoneNumber: String,
                    dob: String,
                    address: String
                }
            * }
            * @returns {String} _userId, save to localStorage in client pls
        */
        createUser: async (parent, args) => {
            const _userId = uuidv4()
            try {
                const newUser = new User({ _userId: _userId, ...args.body })
                newUser.save()

                return _userId;
            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        /** update an user information with params _userId, body
            * @param {Object} args {
                body: {
                    name: String,
                    email: String,
                    phoneNumber: String,
                    dob: String,
                    address: String
                }
            * }
            * @returns {String} status 
        */
        updateUser: async (parent, args) => {
            try {
                await User.findOne({ _userId: args._userId })
                    .then(user => {
                        user.name = args.body.name;
                        user.email = args.body.email;
                        user.phoneNumber = args.body.phoneNumber;
                        user.dob = args.body.dob;
                        user.address = args.body.address;
                        user.save();
                    })

                return "User updated!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

        /** delete an user with param _userId
            * @param {Object} args {
                _userId: String
            * }
            * @returns {String} status 
        */
        deleteUser: async (parent, args) => {
            try {
                await User.findOneAndDelete({ _userId: args._userId })
                return "User deleted!"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message)
            }
        },

        /** user save a favorite court with params _userId, _courtId
            * @param {Object} args {
                    _userId: String
                    _courtId: String
                }
            * }
            * @returns {String} status 
        */
        createFavorite: async (parent, args) => {
            try {
                const court = await Court.findOne({ _courtId: args._courtId })
                await User.findOneAndUpdate(
                    { _userId: args._userId },
                    { $addToSet: { favorites: court } },
                    { new: true }
                );

                return "Favorite court added"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },

        /** user remove a favorite court with params _userId, _courtId
            * @param {Object} args {
                    _userId: String
                    _courtId: String
                }
            * }
            * @returns {String} status 
        */
        deleteFavorite: async (parent, args) => {
            try {
                await User.findOneAndUpdate(
                    { _userId: args._userId },
                    { $pull: { favorites: args._id } },
                    { new: true }
                );

                return "Favorite court removed"

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },

    }
}

