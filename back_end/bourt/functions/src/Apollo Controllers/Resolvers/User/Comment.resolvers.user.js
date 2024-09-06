import Comment from '../../../Model/Comment.model.js'
import User from '../../../Model/User.model.js'
import Court from '../../../Model/Court.model.js'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
    Query: {
        getComments: async (parent, args) => {
            try {
                const results = await Comment.find({ _courtId: args._courtId })
                    .skip(args.params.start)
                    .limit(args.params.end - args.params.start)
                    .sort({ createdAt: 'descending' })
                return results;

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },
    },

    Mutation: {
        createComment: async (parent, args) => {
            const _commentId = uuidv4()
            try {
                const myPromise = new Promise(async (resolve, reject) => {
                    const _userId = args.body._userId;
                    await User.findOne({ _userId: _userId })
                        .then(user => {
                            resolve(user)
                        })
                        .catch(err => reject(err))
                });

                myPromise
                    .then(async (user) => {
                        await Court.findOne({ _courtId: args.body._courtId })
                            .then(court => {
                                court.rating.totalRating += 1;
                                court.rating.sumRating += args.body.rating
                                court.save()
                            })

                        const newComment = new Comment({
                            _commentId: _commentId,
                            name: user.name,
                            ...args.body
                        })
                        newComment.save()
                    })
                    .catch((err) => {
                        throw new Error('Error: ' + err.message);
                    });

                return _commentId;

            } catch (err) {
                throw new Error('Error: ' + err.message);
            }
        },

        deleteComment: async (parent, args) => {
            try {
                await Comment.findOneAndDelete({ _commentId: args._commentId })
                return "Comment deleted!"

            } catch (err) {
                throw new Error('Error: ' + err.message)
            }
        },
    }
}

