const express = require("express");
const supplierRouter = express.Router();
const supplierController = require("../controllers/supplier.controller");
const { authJwt } = require("../middlewares");

supplierRouter.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  supplierController.getAllSupplier
);

supplierRouter.get(
  "/:id",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  supplierController.getSupplier
);

supplierRouter.post(
  "/create",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  supplierController.createSupplier
);

supplierRouter.put(
  "/:id/update",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  supplierController.updateSupplier
);

supplierRouter.delete(
  "/:id/delete",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  supplierController.deleteSupplier
);

module.exports = supplierRouter;
