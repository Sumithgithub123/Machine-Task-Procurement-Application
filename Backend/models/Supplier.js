const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  address: String,
  taxNo: String,
  country: String,
  mobile: String,
  email: String,
  status: { type: String, default: 'Active' },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
