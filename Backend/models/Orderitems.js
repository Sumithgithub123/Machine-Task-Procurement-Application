const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  quantity: Number,
  unitPrice: Number,
  discount: Number,
  netAmount: Number,
});

module.exports = mongoose.model("OrderItems", OrderItemSchema);
