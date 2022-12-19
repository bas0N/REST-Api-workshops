const orderRouter = require("./routes/orderRouter");
// Import the mongoose module
const mongoose = require("mongoose");
require("dotenv").config();

// Set up default mongoose connection
const mongoDB = process.env.MONGODB_STRING;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));
//use order route
app.use("/orders", orderRouter);
// create a server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
