// const {initializeApp} = require('firebase-admin/app'); 
// const admin = require("firebase-admin")
// const serviceAccount = require('../../sut-app-677d2-firebase-adminsdk-i3row-8c74c54ec0.json');
// const { getFirestore } = require('firebase-admin/firestore');
// cre = process.env


// initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: cre.DATABASE_URL
//   });


//   const db = getFirestore()

class ChatRoomClass {
    constructor(admin, db, id) {
        this.admin = admin;
        this.db = db
        this.userId = id.userId;
        this.recipentId = id.recipentId; 
        this.collectionName = "testchat";
        // this.docRef = db.collection(this.collectionName)
        //     .where("userIds", "==", this.userId) || null;
        this.roomRef = null;

        this.localActive = null;
        this.unsubscribe = null;
        this.chatUnsubscribe = null
        this.docId = null;



    };

    // on connect to get message and listening
    onConnectAll(ws) {
        console.log("Connecting All Chat")
        const allRoomRef = this.db.collection(this.collectionName)
            .where("userIds", "array-contains", this.userId);
        if (allRoomRef) {
            this.unsubscribe = allRoomRef.onSnapshot(async (snapshot) => {
                this.localActive = true;
                console.log("Listening from Real-time Firebase")
                snapshot.forEach((doc) => {
                    const chatRef = doc.ref.collection("chats");
                    this.chatUnsubscribe = chatRef.onSnapshot((chatSnapshot) => {
                        const chatsData = [];
                        chatSnapshot.forEach((chatDoc) => {
                            const chatDocData = chatDoc.data();
                            chatsData.push(chatDocData);
                        });
                        console.log(chatsData);
                        ws.send(JSON.stringify(chatsData));
                    })
                });

            }, (error) => {
                console.log(error)
            });
        } else {
            console.log("User does not have any room:))")
        }




    };

    async onConnectRoom(ws) {
        // Init
        const userIds = [this.userId, this.recipentId].sort();
        const roomRef = this.db.collection(this.collectionName).where("userIds", "==", userIds);
        
        await roomRef.get().then(async (snapshot) => { 
            const doc = snapshot.docs; 
            if (doc.length === 1 ) { 
                console.log("Room exist!")
            } else { 
                console.log("Room does not exist! Creating chat room......")
                await this.createRoomSolo(this.recipentId);
            }
        })

        
        this.unsubscribe = roomRef.onSnapshot(async (snapshot) => {
            this.localActive = true 
            console.log("Listening from Real-time Firebase")
            snapshot.forEach((doc) => {
                const chatsSubcollectionRef = doc.ref.collection("chats");

                // Attach an onSnapshot listener to the "chats" subcollection
                this.chatUnsubscribe = chatsSubcollectionRef.orderBy("timestamp").onSnapshot((chatsSnapshot) => {
                    const chatsData = [];
                    chatsSnapshot.forEach((chatDoc) => {
                        const chatDocData = chatDoc.data();
                        chatsData.push(chatDocData);
                    });

                    // Send the chat data to the client
                    ws.send(JSON.stringify({ chats: chatsData }));
                });
            });

        }, (error) => {
            console.log(error);
        });
    };

    onDisconnect() {
        if (this.unsubscribe && this.localActive) {
            this.chatUnsubscribe();
            this.unsubscribe();
            this.localActive = false;
            console.log('Stopped listening from Real-time Firebase')
        }
    };

    async createRoomSolo(otherId) {
        try {
            const chatRoomRef = await this.db.collection(this.collectionName).add({
                userIds: [this.userId, otherId].sort()
            })
            const chatRef = chatRoomRef.collection("chats"); 
            await chatRef.add({});
          
            console.log("Created new room")
        } catch (error) {
            console.log("Error in create room: ", error.message);
            return false
        }

    }

    // 

    async sendMessage(message) {
        console.log(this.recipentId)
        const userIds = [this.userId, this.recipentId].sort()
        // console.log(userIds)
        const roomRef = this.db.collection(this.collectionName).where("userIds", "==", userIds);
        const newChatMessage = {
            senderId: this.userId,
            message: message,
            timestamp: this.admin.firestore.FieldValue.serverTimestamp(),
        };

        console.log(newChatMessage); 
        try {
            const snapshot = await roomRef.get();
        
            if (snapshot.size === 1) {
                // Room found
                const roomDoc = snapshot.docs[0];
                const roomId = roomDoc.id;
        
                // Reference to the "chats" subcollection
                const chatsRef = roomDoc.ref.collection("chats");
        
                // Add a new document to the "chats" subcollection
                await chatsRef.add(newChatMessage);
        
                console.log(`New chat message added to the "chats" subcollection of room with ID: ${roomId}`);
            } else {
                // Room not found or multiple rooms found
                console.log("Room not found or multiple rooms found.");
            }
        } catch (error) {
            console.error("Error querying the room or adding a new chat message:", error);
        };
    }
}

module.exports = ChatRoomClass

// const newChat = new ChatRoomClass(admin, db,"hoangquan")
// newChat.onConnectRoom("chusan3"); 

