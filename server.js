const orderRouter = require("./routes/orderRouter");

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
