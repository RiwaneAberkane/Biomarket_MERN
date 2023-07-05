const express = require("express");
const saleRouter = express.Router();
const saleController = require("../controllers/sale.controller");
const { authJwt } = require("../middlewares");

saleRouter.post(
  "/create",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  saleController.createSale
);

saleRouter.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  saleController.getAllSell
);

module.exports = saleRouter;
