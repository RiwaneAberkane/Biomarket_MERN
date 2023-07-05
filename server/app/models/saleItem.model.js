const mongoose = require("mongoose");

const saleItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale",
    required: true,
  },
});

module.exports = mongoose.model("SaleItem", saleItemSchema);
