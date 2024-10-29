const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");

router.post("/", async (req, res) => {
  const newSupplier = new Supplier(req.body);
  await newSupplier.save();
  res.json(newSupplier);
});

router.get("/", async (req, res) => {
  const suppliers = await Supplier.find({ status: "Active" });
  res.json(suppliers);
});

module.exports = router;
