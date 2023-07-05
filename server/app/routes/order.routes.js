const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller");
const { authJwt } = require("../middlewares");

orderRouter.post(
  "/create",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  orderController.createOrder
);

orderRouter.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  orderController.getAllOrders
);

module.exports = orderRouter;
