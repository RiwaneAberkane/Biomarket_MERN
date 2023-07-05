const express = require("express");
const orderItemRouter = express.Router();
const orderItemConttroller = require("../controllers/orderItem.controller");
const { authJwt } = require("../middlewares");

orderItemRouter.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  orderItemConttroller.getAllOrderItems
);

orderItemRouter.get(
  "/items/:orderId",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  orderItemConttroller.getOrderItemsByOrderIdController
);

module.exports = orderItemRouter;
