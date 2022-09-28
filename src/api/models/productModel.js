const mongoose = require("mongoose");

const productosCollection = "productos";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 10000000 },
  stock: { type: Number, required: true, max: 100 },
  foto:{ type: String, required: true, max: 1000000 }
});

const products = mongoose.model(productosCollection,productSchema)
module.exports = products

