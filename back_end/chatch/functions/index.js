
require('dotenv').config();
const cre = process.env;

const express = require("express");
// const bodyParser = require("body-parser"); 
const cors = require('cors');
const http = require('http')

const functions = require("firebase-functions/v2");
const admin = require("firebase-admin")
const serviceAccount = require('./sut-app-677d2-firebase-adminsdk-i3row-8c74c54ec0.json');
const { initializeApp } = require('firebase-admin/app');
const ws = require('ws');
const Chat = require('./src/Services/Chat.services.js')
const { getFirestore } = require('firebase-admin/firestore');


//----------------------------------------------------------------
initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: cre.DATABASE_URL
});
//----------------------------------------------------------------
// Init server
const app = express();
const httpServer = http.createServer(app);
app.use(cors())

let server; // http.Server
const wss = new ws.WebSocketServer({
  noServer: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
    
  }
});
//----------------------------------------------------------------
// Event
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("message", (message) => {
    const buffer = Buffer.from(message, 'hex');
    const messageString = buffer.toString('utf-8');
    const data = JSON.parse(messageString);

    const db = getFirestore();
    const id = { 
      userId: data._userId, 
      recipentId: data._recipentId
    }
    const chat = new Chat(admin, db, id);

    switch(data.type) { 
      case "allMessage":
        chat.onConnectRoom(ws);
        break
      case "sendMessage": 
        if (data.message) { 
          chat.sendMessage(data.message)
        }
        break
    }



    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      chat.onDisconnect();

    })

  });

});



//----------------------------------------------------------------
// CORS middleware
const handleCORS = (req, res) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
};

//----------------------------------------------------------------
const wsConfig = (req, res) => {
  handleCORS(req, res);
  const reqServer = req.socket.server;
  if (reqServer === server) return;
  server = reqServer;

  // Upgrade HTTP --> WebSocket
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  //Retry 503 error
  res.setHeader("Retry-After", 0).status(503).send("Websockets now ready");
}


//----------------------------------------------------------------

//Testing locally 
// httpServer.on("upgrade", (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit("connection", ws, request);
//   });
// })

// httpServer.listen(8000, () => {
//   console.log(`Server listening on port ws://localhost:${8000}`);

// })

//----------------------------------------------------------------
exports.chattest = functions.https.onRequest({
  timeoutSeconds: 1200,
  region: "asia-southeast1"
}, wsConfig);

