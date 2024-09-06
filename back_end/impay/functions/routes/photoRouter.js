const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const connection = mongoose.connection;
const gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'photos' });

// media routes
router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'File not found' });
        }

        const readStream = gfs.openDownloadStreamByName(req.params.filename);
        readStream.pipe(res);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:filename", async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'File not found' });
        }

        // Delete the file from GridFS
        await gfs.delete(file[0]._id);

        res.send("success");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;