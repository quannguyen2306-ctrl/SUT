import { getFirestore } from 'firebase-admin/firestore';
import Court from '../Model/Court.model.js'
import { calcGap, reverseGap } from '../Common/gap.common.js'
import { gapIndex, furtherDay } from '../Common/constants.common.js';

class AvailaiblityClass {
    /**
     * @param {string} courtID 
     */
    constructor(db, res) {
        this.db = db; 
        this.res = res; 
        this.unsubscribe = null; 


    }

    /**
     *OnSnapShot the change of firebase data  
     * @param {Object} data 
     */
    async getAvailablity(data) {
        // PARAMS
        const { _courtId, day, month, year } = data;

        // SPECIFY DATE RANGE X
        const startDate = new Date(year, month-1, day, 10, 0); 
        const endDate = new Date(startDate); 
        endDate.setDate(startDate.getDate() + furtherDay);
        console.log(`Start date: ${startDate}; End date: ${endDate}`);

        // GET WORKING HOURS
        const wh = await Court.findOne({ _courtId: _courtId }, ['workingHours']);
        const totalGapList = calcGap(wh.workingHours.start, wh.workingHours.end);
        const totalGapSet = new Set(totalGapList);

        // HASH DATE RANGE X (pre-processing)
        const hashDate = {}; 

        for (let i = 0; i<=furtherDay; i++) {    
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i); 
            hashDate[(currentDate.getTime()).toString()] = new Set([...totalGapSet]); 
        }
        
        // QUERY (locked timestamp)
        const docRef = this.db.collection('court')
            .doc(_courtId)
            .collection('timestamp')
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .where('lock', '==', true);

        // ONSNAPSHOT - REAL TIME
        this.unsubscribe = docRef.onSnapshot(async (snapshot) => { 
            if (snapshot.empty) { 
                console.log("Snapshot is empty!");
            }; 
            // processing
            snapshot.forEach((timestamp) => { 
                const docId = timestamp.id;
                const gapId = parseInt(docId.split("_")[gapIndex]);
                const date = ((timestamp.data().date._seconds)*1000).toString();
                if(hashDate.hasOwnProperty(date)) {
                    console.log(date);
                    if (hashDate[date].has(gapId)) { 
                        console.log("testing");
                        hashDate[date].delete(gapId);
                    } else {
                        console.log(`Item ${gapId} does not exist in the set for timestamp '${date}'.`);
                      }
                } else { 
                    console.log(`Timestamp '${timestampToDeleteFrom}' does not exist in the object.`);
                };
            });
            // console.log(hashDate);
            const result = [];
            for (const date of Object.keys(hashDate)) { 
                const response = { 
                    date: new Date(parseInt(date)), 
                    availability: Array.from(hashDate[date])
                }
                result.push(response);
            }

            const eventData = `data: ${JSON.stringify(result)}\n\n`;
            console.log(eventData);
            this.res.write(eventData);
        })

    }

    onDisconnect() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    /**
     * @param {string} courtId 
     * @param {int} maxSCourt 
     */
    static async createNewCourtAvailability(courtId, maxSCourt) {
        const newFirebaseDb = getFirestore();
        const courtRef = newFirebaseDb.collection('court').doc(courtId);
        const timestampRef = courtRef.collection('timestamp');
        const field = {
            maxSCourt: maxSCourt
        }; 
        //add maxSCourt
        await courtRef.set(field, { merge: true });
        //create new timestamp collection in firestore db 
        await timestampRef.add({});

    }


    /** CUD Availability on FIRESTORE,
     * @param {string} courtId 
     * @param {Date} date 
     * @param {Array} gapList Array of gapNumber (int) in params:date
     * @param {string} condition add delete 
     * @returns {boolean} True if update sucessfully, vice versa
     */
    static async modifyAvailabilityDaily(_courtId, date, gapList, condition, maxSCourt) {
        const firebaseDB = getFirestore();
        const rootDocRef = firebaseDB.collection('court').doc(_courtId);

        const dateSuffix = `_${date.getDate()}:${date.getMonth()+1}:${date.getFullYear()}`;

        const timeStampList = gapList.map((gap) => {
            const timestamp = String(gap).concat(dateSuffix)
            return timestamp
        })

        // array of timeStampRef
        const timeStampRefArray = timeStampList.map(timestamp => {
            const timeStampRef = rootDocRef.collection('timestamp').doc(timestamp);
            return timeStampRef;
        });

        try {
            let response = {}
            timeStampRefArray.forEach(async timeStampRef => {
                await firebaseDB.runTransaction(async (transaction) => {
                    const sfDoc = await transaction.get(timeStampRef);
                    if (!sfDoc.exists && condition == "add") {
                        console.log(1)
                        const locked = maxSCourt > 1 ? false : true;

                        const initData = {
                            date: date,
                            counter: maxSCourt - 1,
                            lock: locked
                        }
                        transaction.set(timeStampRef, initData);
                        response = { 
                            success: true, 
                            message: "Add new timestamp success", 
                            error: null,
                        }
                        

                    } else if (sfDoc.exists && condition == "add") {
                        console.log(2)
                        console.log(sfDoc.data())
                        const currentLocked = sfDoc.data().lock;
                        const currentCounter = sfDoc.data().counter;

                        const newCounter = currentCounter - 1;
                        const locked = newCounter > 0 ? false : true;

                        if (!currentLocked) {
                            const updatedData = {
                                counter: newCounter,
                                lock: locked
                            }
                            transaction.update(timeStampRef, updatedData)
                            response = { 
                                success: true, 
                                message: "Add counter success", 
                                error: null,
                            }
                        }

                    } else if (sfDoc.exists && condition == "delete") {
                        console.log(3)
                        console.log(sfDoc.data())

                        const currentLocked = sfDoc.data().lock;
                        const currentCounter = sfDoc.data().counter;

                        const newCounter = currentCounter + 1;
                        const locked = newCounter > 0 ? false : true;

                        if (newCounter <= maxSCourt) {
                            const updatedData = {
                                counter: newCounter,
                                lock: locked
                            }
                            transaction.update(timeStampRef, updatedData);
                            response = { 
                                success: true, 
                                message: "Delete counter success", 
                                error: null,
                            }
                        }
                    } else {
                        response = { 
                            success: false, 
                            message: "Error", 
                            error: null,
                        }
                    }
                });
            }); 
            console.log(response)
            return response;
        } catch (e) {
            console.log(e)
            throw e; 
        }
    }
}

export const Availability = AvailaiblityClass