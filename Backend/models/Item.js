const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  location: String,
  brand: String,
  category: String,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  stockUnit: String,
  unitPrice: Number,
  images: [String],
  status: { type: String, default: "Enabled" },
  incart: Boolean,
});

module.exports = mongoose.model("Item", ItemSchema);
