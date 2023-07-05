const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pachatkg: {
    type: Number,
    required: true,
  },
  pventekg: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
