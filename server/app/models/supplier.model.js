const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
