const Product = require("../models/product.model");

// POST ------------------------

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
      pachatkg: req.body.pachatkg,
      pventekg: req.body.pventekg,
      status: req.body.status,
    });
    await product.save();
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

//GET ALL------------------------

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

//GET BY ID------------------------

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

// UPDATE ----------------------

exports.updateProduct = async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send({ message: "Product updated" });
  } catch (err) {
    console.error(err);
  }
};

// DELETE -------------

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    s;
  }
};
