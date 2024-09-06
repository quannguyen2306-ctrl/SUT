import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import admin from "firebase-admin";
import { Availability } from '../Services/Availability.services.js';
const router = express.Router();


router.route('/availability').get(async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const db = getFirestore();
    const sse = new Availability(db, res); 
    // Connect SSE
    console.log(req.query)
    const data = { 
        _courtId: req.query._courtId, 
        day: parseInt(req.query.day),
        month: parseInt(req.query.month),
        year: parseInt(req.query.year),
    }
    sse.getAvailablity(data)
    // countdown(res, 10)
    req.on("close", () => { 
        console.log("Client disconnected from SSE Availability"); 
        // Disconnect SSE
        sse.onDisconnect();
        res.end();
    })
})



export default router; 
