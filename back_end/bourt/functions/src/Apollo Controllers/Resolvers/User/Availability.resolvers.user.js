import { Availability } from '../../../Services/Availability.services.js'
import Court from '../../../Model/Court.model.js'
const sleep = (t = 1000) => new Promise(res => setTimeout(res, t))
export const resolvers = {
    Mutation: {
        updateAvailabilityDaily: async (_, args) => {
            try {

                console.log(args)
                const courtId = args._courtId;
                const { day, year, month, gapList, condition } = args.body;
                const newDate = new Date(year, month-1, day, 10, 0);
                const maxSCourt = await Court.findOne({ _courtId: courtId }, ['maxSCourt'])
                try { 
                    const result = Availability.modifyAvailabilityDaily(courtId, 
                        newDate, 
                        gapList, 
                        condition, 
                        maxSCourt.maxSCourt);
                    console.log(result); 
                    return result;

                } catch (error) { 
                    console.error('Modify availability failed:', error.message);
                    throw new Error('Modify availability failed: ' + error.message);
                }


                
            } catch (error) {
                console.error('Error in handling availability:', error.message);
                throw new Error('Error in handling availability: ' + error.message);
            }
        }
    }

}

