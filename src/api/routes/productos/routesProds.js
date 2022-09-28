const express = require("express");
const mongoose = require("mongoose");
const { ProductDaoMongo } = require("../../DAOs/prodDaoMongo");
const logger = require("../../../utils/logger");

const prodDao = new ProductDaoMongo("productos");
const router = express.Router();

router.get("/products", async (req, res) => {
  let prods = await prodDao.getAll("productos");

  res.json({ prods });
});

router.get("/products/:id", async (req, res) => {
  let prod = await prodDao.getProdById(req.params.id);
  res.json(prod);
});

router.post("/products", (req, res) => {
  let product = req.body;

  if (product && product.name && product.price && product.stock) {
    productTest = prodDao.saveProd(product);
    logger.info("Producto guardado");
    res.json({ result: "product saved", product: productTest });
  } else {
    res.json({ result: "Prod cannot saved" });
  }
});

module.exports = router;
