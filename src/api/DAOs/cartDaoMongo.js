const ContainerMongo = require("./containerDao");
const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const { mail } = require("../services/sendBuyMail");
const logger = require("../../utils/logger");
class CartDaoMongo extends ContainerMongo {
  constructor(a) {
    super(a);
    this.carro = cartModel;
  }

  async getCartById(id) {
    if (id) {
      let elemById = this.getById(id, "carrito");
      return elemById;
    }
  }

  async getCartByUser(name) {
    if (name) {
      const cartUser = await this.carro.findOne({ id: name });
      return cartUser;
    } else {
      return "Cart not found";
    }
  }

  async saveCart(cart) {
    if (cart) {
      this.save(cart, "carrito");
      return cart;
    } else {
      return "Cart not save";
    }
  }

  async updateCart(carrito) {
    if (carrito) {
      this.update(carrito, "carrito");
      return carrito;
    } else {
      return "Cart not updeted";
    }
  }
  async updateProdsCart(prod, id) {
    if (prod) {
      this.addProdToCart(prod, id);
      return prod;
    } else {
      return "Not update product in cart";
    }
  }

  async deleteProdCart(prod, idCart) {
    if (prod) {
      const cartUser = await this.carro.findOne({ id: idCart });

      let aux = cartUser.productos;
      let index = aux.filter(e => {
        console.log("dentro de index");
        return e.name !== prod.name;
      });

      cartUser.productos = index;
      console.log(cartUser);

      let saveCart = this.update(cartUser, cartUser.id, "carrito");
      return saveCart;
    } else {
      return "Not update product in cart";
    }
  }

  async deleteAllProdCart(idCart) {
    const cartUser = await this.carro.findOne({ id: idCart });
    cartUser.productos = [];
    let saveCart = this.update(cartUser, cartUser.id, "carrito");
    return saveCart;
  }

  async buyCart(idCart) {
    const cartUser = await this.carro.findOne({ id: idCart });
    if (idCart) {
      mail(cartUser);
      cartUser.productos = [];
      let buyCart = this.update(cartUser, cartUser.id, "carrito");
      logger.info("Compra exitosa");
      return buyCart;
    } else {
      logger.error("Hubo un problema con la compra");
    }
  }
}

module.exports = { CartDaoMongo };
