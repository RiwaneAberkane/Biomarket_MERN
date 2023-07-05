const Supplier = require("../models/supplier.model");

// POST ------------------------

exports.createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      mail: req.body.mail,
      adress: req.body.adress,
      city: req.body.city,
    });
    await supplier.save();
    res.send(supplier);
  } catch (err) {
    res.send(err);
  }
};

//GET ALL------------------------

exports.getAllSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find();
    res.send(supplier);
  } catch (err) {
    res.send(err);
  }
};

//GET BY ID------------------------

exports.getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.send(supplier);
  } catch (err) {
    res.send(err);
  }
};

// UPDATE ----------------------

exports.updateSupplier = async (req, res) => {
  try {
    await Supplier.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send({ message: "Supplier updated" });
  } catch (err) {
    console.error(err);
  }
};

// DELETE -------------

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "Supplier deleted" });
  } catch (err) {
    console.error(err);
    s;
  }
};
