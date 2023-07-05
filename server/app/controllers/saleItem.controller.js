const SaleItem = require("../models/saleItem.model");

// GET ALL ORDER ITEMS ------------------------------------------

exports.getAllSaleItems = async (req, res) => {
  try {
    const saleItems = await SaleItem.find();
    res.status(200).json(saleItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des articles de vente.",
    });
  }
};

exports.getSaleItemsBySaleIdController = async (req, res) => {
  const { saleId } = req.params;
  console.log(saleId);

  try {
    const saleItems = await SaleItem.find({ sale: saleId }).populate("product");
    console.log(saleItems);
    res.json(saleItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des Sale Items.",
    });
  }
};
