// Express and server import 
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'; dotenv.config()

// Firebase-tools import 
import functions from 'firebase-functions/v2';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app'

import { assert } from 'console';
import serviceAccount from './sut-app-677d2-firebase-adminsdk-i3row-8c74c54ec0.json' assert { type: "json" }

// MongoDB import 
import mongoose from 'mongoose';

// Pub-sub import 
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

// Apollo server import
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

import pkg from 'lodash';
const { merge } = pkg;

import { typeDefs as typeDefs_Court } from './src/Apollo Controllers/Schema/Court.schema.js';
import { typeDefs as typeDefs_User } from './src/Apollo Controllers/Schema/User.schema.js';
import { typeDefs as typeDefs_Owner } from './src/Apollo Controllers/Schema/Owner.schema.js';
import { typeDefs as typeDefs_Availability } from './src/Apollo Controllers/Schema/Availability.schema.js';
import { typeDefs as typeDefs_Comment } from './src/Apollo Controllers/Schema/Comment.schema.js';
import { typeDefs as typeDefs_Chat } from './src/Apollo Controllers/Schema/Chat.schema.js';
import { typeDefs as typeDefs_Booking } from './src/Apollo Controllers/Schema/Booking.schema.js';
import { typeDefs as typeDefs_Statistic } from './src/Apollo Controllers/Schema/Statistic.schema.js';
import { typeDefs as typeDefs_Checkin } from './src/Apollo Controllers/Schema/Checkin.schema.js';


// User
import { resolvers as User_CourtResolvers } from './src/Apollo Controllers/Resolvers/User/Court.resolvers.user.js';
import { resolvers as User_UserResolvers } from './src/Apollo Controllers/Resolvers/User/User.resolvers.user.js';
import { resolvers as User_AvailabilityResolvers } from './src/Apollo Controllers/Resolvers/User/Availability.resolvers.user.js';
import { resolvers as User_CommentResolvers } from './src/Apollo Controllers/Resolvers/User/Comment.resolvers.user.js';
import { resolvers as User_ChatResolvers } from './src/Apollo Controllers/Resolvers/User/Chat.resolvers.user.js';
import { resolvers as User_BookingResolvers } from './src/Apollo Controllers/Resolvers/User/Booking.resolvers.user.js';
import { resolvers as User_CheckinResolvers } from './src/Apollo Controllers/Resolvers/User/Checkin.resolvers.user.js';

// Owner
import { resolvers as Owner_OwnerResolvers } from './src/Apollo Controllers/Resolvers/Owner/Owner.resolvers.owner.js';
import { resolvers as Owner_CourtResolvers } from './src/Apollo Controllers/Resolvers/Owner/Court.resolvers.owner.js';
import { resolvers as Owner_StatisticResolvers } from './src/Apollo Controllers/Resolvers/Owner/Statistic.resolvers.owner.js';
import { resolvers as Owner_CheckinResolvers } from './src/Apollo Controllers/Resolvers/Owner/Checkin.resolvers.owner.js';
import { resolvers as Owner_BookingResolvers } from './src/Apollo Controllers/Resolvers/Owner/Booking.resolvers.owner.js';


// custom controllers
// import { router as ImageRouter} from './src/Custom Controller/Image Controller/Image.js'

const cre = process.env

// ____________________________________________________________________________________________________________________________________
// Firebase init 
initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: cre.USER_FIREBASE_DB_URL
})

// App init
const app = express();
const httpServer = http.createServer(app);

const typeDefs = [
    typeDefs_Court,
    typeDefs_User,
    typeDefs_Owner,
    typeDefs_Availability,
    typeDefs_Comment,
    typeDefs_Chat,
    typeDefs_Booking,
    typeDefs_Statistic,
    typeDefs_Checkin
]
const resolvers = merge(
    User_CourtResolvers,
    Owner_CourtResolvers,
    User_UserResolvers,
    Owner_OwnerResolvers,
    User_AvailabilityResolvers,
    User_CommentResolvers,
    User_ChatResolvers,
    User_BookingResolvers,
    Owner_BookingResolvers,
    Owner_StatisticResolvers,
    User_CheckinResolvers,
    Owner_CheckinResolvers
)

const schema = makeExecutableSchema({ typeDefs, resolvers });


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    }
                }
            }
        },
        // Install a landing page plugin based on NODE_ENV
        cre.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: 'my-graph-id@my-graph-variant',
                footer: false,
            })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],

});

// WebSocket config
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api/v1'
})
const serverCleanup = useServer({
    schema,
    context: async (ctx, _, __) => {
        // ctx['pubsub'] = pubsub
        return ctx
    }
}, wsServer)


await server.start();

const corsOptions = {
    origin: '*', // Replace with client's URL
    credentials: true,
    optionsSuccessStatus: 204,
};


// Use /api/v1 route
app.use(
    '/api/v1/graphql',
    cors(corsOptions),
    bodyParser.json({ limit: '50mb' }), // you can limit bandwith???
    expressMiddleware(server, {
        context: ({ req, res }) => ({ token: req.headers.token, res, pubsub }),
    }),


);

// Landing page 
app.get('/', (_, res) => {
    res.send("Súttttttttt");
})
// Availability REST-SSE
import AvailabilityRouter from "./src/Express Controllers/availability.controllers.js"; 
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use("/api/v1/rest", AvailabilityRouter); 


// app.use('/api/image', ImageRouter)

// MongoDB init
const uri = `mongodb+srv://${cre.MONGODB_USERNAME}:${cre.MONGODB_PASSWORD}@${cre.MONGODB_CLUSTER}.zperdfi.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// ____________________________________________________________________________________________________________________________________
// Spin up server
await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
console.log(`🚀 GRAPHQL Server ready at http://localhost:8000/api/v1/graphql`);
console.log(`🚀 REST Server ready at http://localhost:8000/api/v1/rest`);


// Firebase deploy
export const api = functions.https.onRequest({
    timeoutSeconds: 1200,
    region: "asia-southeast1"
}, app);



