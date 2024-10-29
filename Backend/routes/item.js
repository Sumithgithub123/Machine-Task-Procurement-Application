const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Supplier = require("../models/Supplier");
const Orderitems = require("../models/Orderitems");

router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  const item = await Item.find();
  for (let i = 0; i < item.length; i++) {
    const supplier = await Supplier.findOne({ _id: item[i].supplier });
    item[i].supplier = supplier;
    const orderitems = await Orderitems.findOne({ item: item[i]._id });
    if (orderitems) {
      item[i].incart = true;
    }
  }
  res.json(item);
});

router.get("/", async (req, res) => {
  const item = await Item.find();
  for (let i = 0; i < item.length; i++) {
    const supplier = await Supplier.findOne({ _id: item[i].supplier });
    item[i].supplier = supplier;
    const orderitems = await Orderitems.findOne({ item: item[i]._id });
    if (orderitems) {
      item[i].incart = true;
    }
  }
  res.json(item);
});

module.exports = router;
