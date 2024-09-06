import Court from '../../../Model/Court.model.js'

export const resolvers = {
    Query: {
        /** get all courts with params start and end
            * @param {Object} args {
                params: {
                    start: Int
                    end: Int
                }
            * }
            * @returns {Array}
        */
        courts: async (parent, args) => {
            try {
                return await Court.find({ deleted: false })
                    // .sort({ createdAt: -1 }) // sort algorithm
                    .skip(args.params.start)
                    .limit(args.params.end - args.params.start)

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        /** get a single court with param _courtId
            * @param {Object} args {
                _courtId: String
            * }
            * @returns {Array}
        */
        singleCourt: async (parent, args) => {
            try {
                return await Court.findOne({ _courtId: args._courtId })

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },

        /** get 10 courts with names like param searchInput
            * @param {Object} args {
                searchInput: String
            * }
            * @returns {Array}
        */
        searchCourts: async (parent, args) => {
            const searchTerm = args.searchInput
            try {
                return await Court.aggregate([
                    {
                        $search: {
                            "index": "searchCourtName",
                            "text": {
                                "query": searchTerm,
                                "path": "courtName",
                                fuzzy: {}
                            },
                        },
                    },
                    {
                        $project: {
                            courtName: 1,
                            _courtId: 1,
                            address: 1,
                            pricePerHour: 1,
                            image: 1
                        },
                    }
                ]).limit(10)

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
    },

    Mutation: {
        /** add rating to a court with params _courtId, rating
            * @param {Object} args {
                _courtId: String,
                rating: Int
            * }
            * @returns {Array}
        */
        addRating: async (parent, args) => {
            try {
                let result
                await Court.findOne({ _courtId: args._courtId })
                    .then(court => {
                        court.rating.totalRating += 1;
                        court.rating.sumRating += args.rating
                        court.save()
                        result = court
                    })
                return result

            } catch (err) {
                console.log(err)
                throw new Error('Error: ' + err.message);
            }
        },
        // deleteRating: async (parent, args) => {
        //     try {
        //         await Court.findOne({ _courtId: args._courtId })
        //             .then(court => {
        //                 court.rating.totalRating -= 1;
        //                 court.rating.sumRating -= args.rating
        //                 court.save()
        //             })
        //         return "Rating deleted"

        //     } catch (err) {
        //         console.log(err)
        //         throw new Error('Error: ' + err.message);
        //     }
        // },
    }
}

