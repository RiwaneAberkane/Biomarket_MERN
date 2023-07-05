const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");

// CREATE ORDER ------------------------------------------

exports.createOrder = async (req, res) => {
  try {
    const { userId, supplierId, items } = req.body;

    // Vérifier si le fournisseur existe
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(400).json({ error: "Le fournisseur n'existe pas." });
    }

    // Créer une nouvelle commande
    const orderItems = [];
    let totalPrice = 0;

    const order = new Order({
      user: userId,
      supplier: supplierId,
      totalPrice: totalPrice,
    });

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: "Le produit n'existe pas." });
      }

      const orderItem = new OrderItem({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        order: order._id,
      });

      product.quantity += orderItem.quantity;

      // Enregistrer la mise à jour du produit dans la base de données
      await product.save();

      totalPrice += orderItem.quantity * orderItem.price;
      orderItems.push(orderItem);
      await orderItem.save();
    }

    // Mise à jour du prix total de la commande
    order.totalPrice = totalPrice;

    // Save liste orderItems dans order
    order.items = orderItems;

    // Sauvegarder la commande dans la base de données
    const savedOrder = await order.save();

    // Associer l'orderId à chaque orderItem
    for (const orderItem of orderItems) {
      orderItem.order = savedOrder._id;
      await orderItem.save();
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création de la commande.",
    });
  }
};

// GET ALL ----------------------------------------------------

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des commandes.",
    });
  }
};
