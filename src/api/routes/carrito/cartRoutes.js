const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const logger = require("../../../utils/logger");

const { CartDaoMongo } = require("../../DAOs/cartDaoMongo");
const cartDao = new CartDaoMongo("carrito");
const router = express.Router();

router.get("/cart", async (req, res) => {
  let carts = await cartDao.getAll("carrito");

  res.json({ carts });
});

router.get("/cart/:id", async (req, res) => {
  let carts = await cartDao.getCartById(req.params.id);

  res.json({ carts });
});

router.post("/cart", async (req, res) => {
  let cart = await cartDao.saveCart(req.body);
  res.json({ cart });
});

router.post("/addprod/product/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let response = await axios.get(
      `http://localhost:8080/prods/products/${req.params.id}`
    );
    let data = response.data;
    let carts = await cartDao.updateProdsCart(data, user);

    res.redirect("/user/carrito");
  }
});
router.post("/deleteprod/product/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let response = await axios.get(
      `http://localhost:8080/prods/Products/${req.params.id}`
    );
    let data = response.data;
    let carts = await cartDao.deleteProdCart(data, user);

    res.redirect("/user/carrito");
  }
});

router.post("/deleteallprod/product/", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.username;

    let carts = await cartDao.deleteAllProdCart(user);

    res.redirect("/user/carrito");
  }
});

router.get("/cartuser/:name", async (req, res) => {
  let carts = await cartDao.getCartByUser(req.params.name);

  res.json({ carts });
});

router.post("/buy/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    let carts = await cartDao.buyCart(req.params.id);
    res.redirect("/user/profile");
  } else {
    res.render("login");
  }
});

module.exports = router;
