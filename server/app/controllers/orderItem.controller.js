const OrderItem = require("../models/orderItem.model");

// GET ALL ORDER ITEMS ------------------------------------------

exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des articles de commande.",
    });
  }
};

exports.getOrderItemsByOrderIdController = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  try {
    const orderItems = await OrderItem.find({ order: orderId }).populate(
      "product"
    );
    console.log(orderItems);
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des Order Items.",
    });
  }
};
