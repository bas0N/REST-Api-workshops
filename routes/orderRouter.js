const db = require("../db");
const express = require("express");
const router = express.Router();

/* GET all orders */
router.get("/all-orders", async function (req, res, next) {
  res.json(db);
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

module.exports = router;
