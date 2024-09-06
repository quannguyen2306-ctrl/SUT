const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto')
const path = require('path')
const cre = process.env
const uri = `mongodb+srv://${cre.MONGODB_USERNAME}:${cre.MONGODB_PASSWORD}@${cre.MONGODB_CLUSTER}.zperdfi.mongodb.net/?retryWrites=true&w=majority`;

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
          // Check if the file is an image
          if (file.mimetype.startsWith("image/")) {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString("hex") + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: "photos"
              };
              resolve(fileInfo);
            });
          } else {
            // Reject if the file is not an image
            reject(new Error("File type is not allowed. Only image files are allowed."));
          }
        });
    }

});

module.exports = multer({ storage });
