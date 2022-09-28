const mongoose = require("mongoose");
const prodModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel")
const logger = require("../../utils/logger");


class ContainerMongo {
  constructor(mongo) {
    this.connect = mongo;
    this.product = prodModel;
    this.cart = cartModel;
    this.chat = chatModel;
    this.user = userModel;
  }

  async init() {
    await mongoose.connect(this.connect);
    logger.info("conectado a basee de datos mongo atlas");
  }

  async disconnect() {
    await mongoose.disconnect();
    logger.info("basee de datos desconectada");
  }

  async getAll(collection) {
    try {
      if (collection === "productos") {
        const products = await this.product.find({});
        return products;
      } else if (collection === "carrito") {
        const cart = await this.cart.find({});
        return cart;
      }else if (collection === "chat") {
        const chats = await this.chat.find({});
        return chats;
      }
    } catch (error) {
      logger.error(`error: ${error}`);
    }
  }

  async getById(idSearch, collection) {
    try {
      if (collection === "productos") {
        const product = await this.product.findOne({ _id: idSearch });
        return product;
      } else if (collection === "carrito") {
        const cart = await this.cart.findOne({ _id: idSearch });
        return cart;
      }
    } catch (error) {
      logger.error(`error en Crud ProductDao metodo getById: ${error}`);
    }
  }

  async save(data, collection) {
    if (collection === "productos") {
      let product = this.product;
      let saveProducto = new product(data);
      let save = saveProducto.save();
      return save;
    } else if (collection === "carrito") {
      let cart = this.cart;
      let saveCart = new cart(data);
      let save = saveCart.save();
      return save;
    }
    else if (collection === "chat") {

      let chat = this.chat;
      let saveChat = new chat(data);
      let save = saveChat.save();
      return save;
    }
  }

  async update(content, ids, collection) {
    if (collection === "productos") {
      const filter = { id: ids };
      let product = this.product;
      let updateProd = new product(content);
      let update = updateProd.findOneAndUpdate(filter, content, {
        new: true
      });
      return update;
    } else if (collection === "carrito") {
      const filter = { id: ids };
      let cart = this.cart;
      let update = this.cart.findOneAndUpdate(filter, content, {
        new: true
      });
      return update;
    }
  }

  async addProdToCart(content, ids) {
    const filter = { id: ids };

    let update = this.cart.findOneAndUpdate(filter, {
      $push: { productos: content }
    });
    return update;
  }
}

module.exports = ContainerMongo;
