const express = require("express");
const router = express.Router();
const Orderitems = require("../models/Orderitems");
const Item = require("../models/Item");
const Supplier = require("../models/Supplier");

router.post("/", async (req, res) => {
  const newOrderitems = new Orderitems(req.body);
  await newOrderitems.save();
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

router.post("/delete/:id", async (req, res) => {
  await Orderitems.deleteOne({ item: req.params.id });
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
  const orderitems = await Orderitems.find();
  for (let i = 0; i < orderitems.length; i++) {
    const ss = await Item.findOne({ _id: orderitems[i].item });
    orderitems[i].item = ss;
  }
  res.json(orderitems);
});

router.post("/changequantity/:id", async (req, res) => {
  const order = await Orderitems.findOne({ _id: req.params.id });

  const netAmount = order.unitPrice * req.body.quantity - order.discount;

  await Orderitems.findByIdAndUpdate(req.params.id, {
    quantity: req.body.quantity,
    netAmount,
  });
  const orderitems = await Orderitems.find();
  for (let i = 0; i < orderitems.length; i++) {
    const ss = await Item.findOne({ _id: orderitems[i].item });
    orderitems[i].item = ss;
  }
  res.json(orderitems);
});

module.exports = router;
