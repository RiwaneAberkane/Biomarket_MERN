const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");
const { authJwt } = require("../middlewares");

productRouter.get("/", authJwt.verifyToken, productController.getAllProduct);

productRouter.get(
  "/:id",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  productController.getProduct
);

productRouter.post(
  "/create",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  productController.createProduct
);

productRouter.put(
  "/:id/update",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  productController.updateProduct
);

productRouter.delete(
  "/:id/delete",
  authJwt.verifyToken,
  authJwt.isManagerOrAdmin,
  productController.deleteProduct
);

module.exports = productRouter;
