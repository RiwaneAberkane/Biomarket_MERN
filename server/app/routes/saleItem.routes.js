const express = require("express");
const saleItemRouter = express.Router();
const saleItemController = require("../controllers/saleItem.controller");
const { authJwt } = require("../middlewares");

saleItemRouter.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  saleItemController.getAllSaleItems
);

saleItemRouter.get(
  "/items/:saleId",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  saleItemController.getSaleItemsBySaleIdController
);

module.exports = saleItemRouter;
