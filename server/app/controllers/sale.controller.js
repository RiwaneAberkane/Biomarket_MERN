const Sale = require("../models/sale.model");
const SaleItem = require("../models/saleItem.model");
const Product = require("../models/product.model");

// CREATE ORDER ------------------------------------------

exports.createSale = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Créer une nouvelle vente
    const saleItems = [];
    let totalPrice = 0;

    const sale = new Sale({
      user: userId,
      items: saleItems,
      totalPrice: totalPrice,
    });

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: "Le produit n'existe pas." });
      }

      const saleItem = new SaleItem({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        sale: sale._id,
      });

      product.quantity -= saleItem.quantity;

      // Enregistrer la mise à jour du produit dans la base de données
      await product.save();

      totalPrice += saleItem.quantity * saleItem.price;
      saleItems.push(saleItem);
      await saleItem.save();
    }

    // Mise à jour du prix total de la vente
    sale.totalPrice = totalPrice;

    // Save liste saleItems dans sale
    sale.items = saleItems;

    // Sauvegarder la vente dans la base de données
    const saveSale = await sale.save();

    // Associer l'orderId à chaque orderItem
    for (const saleItem of saleItems) {
      saleItem.sale = saveSale._id;
      await saleItem.save();
    }

    res.status(200).json(saveSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la vente.",
    });
  }
};

// GET ALL ----------------------------------------------------

exports.getAllSell = async (req, res) => {
  try {
    const sales = await Sale.find().populate("items");
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des ventes.",
    });
  }
};
