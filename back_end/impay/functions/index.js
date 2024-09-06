require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

const express = require("express");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

const corsOptions = {
    // origin: 'http://localhost:3000', // Replace with your React app's URL
    origin: '*', // Replace with your React app's URL
    // credentials: true,
    // optionsSuccessStatus: 204,
};
app.use(cors(corsOptions))

// const photoUploadRouter = require("./routes/photoUploadRouter");
// const photoRouter = require("./routes/photoRouter");
const paymentRouter = require("./routes/paymentRouter");


// const mongoose = require("mongoose");
// const cre = process.env
// const uri = `mongodb+srv://${cre.MONGODB_USERNAME}:${cre.MONGODB_PASSWORD}@${cre.MONGODB_CLUSTER}.zperdfi.mongodb.net/?retryWrites=true&w=majority`;
// mongoose.connect(uri);

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");

//     app.use("/api/v1/impay", photoUploadRouter);
//     app.use("/photo", photoRouter);
// });

app.use("/api/v1/impay", paymentRouter);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
