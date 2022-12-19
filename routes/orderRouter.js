const db = require("../db");
const express = require("express");
const router = express.Router();

//mongoDB schemas
// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
});
// Compile model from schema
const OrderModel = mongoose.model("OrderModel", OrderSchema);

/* GET all orders */
router.get("/all-orders", async function (req, res, next) {
  const orders = await OrderModel.find();
  res.json(orders);
});

/* GET order by id */
router.get("/:id", async function (req, res, next) {
  const id = req.params["id"];
  const order = db[id];
  if (order) {
    res.json(db[id]);
  } else {
    res.status(400).json({ message: "Order has not been found." });
  }
});
/*POST Add order */
router.post("/", async function (req, res, next) {
  console.log(req.body);

  if (!req.body.name || !req.body.price) {
    req.status(400).json({ message: "Name or price is missing." });
    return;
  }
  const order = {
    id: db.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  OrderModel.create(order);
  db.push(order);

  res.json(order);
  return;
});

/*DELETE Delete order */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  console.log(req.params.id);
  //find id of the element in the array
  const indexOfObject = db.findIndex((object) => {
    return object.id == req.params.id;
  });
  if (indexOfObject == -1) {
    res
      .status(400)
      .json({ message: "Order with the given id does not exist." });
    return;
  }
  //delete element from the "db"
  db.splice(indexOfObject, 1);
  res.json(db[indexOfObject]);
});
/*PUT Update order */
router.put("/", async function (req, res, next) {
  if (!req.body.name || !req.body.price || !req.body.id) {
    res.status(400).json({ message: "Name or price or id is missing." });
    return;
  }
  //find id of the element in the array
  const indexOfObject = db.findIndex((object) => {
    return object.id == req.body.id;
  });
  if (indexOfObject == -1) {
    res
      .status(400)
      .json({ message: "Order with the given id does not exist." });
    return;
  }
  db[indexOfObject].name = req.body.name;
  db[indexOfObject].price = req.body.price;

  res.json(db[indexOfObject]);
});

module.exports = router;
