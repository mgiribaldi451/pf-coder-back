const mongoose = require("mongoose");

const carritoCollection = "carrito";

const cartSchema = new mongoose.Schema({
  timestamp: { type: String, required: true, max: 100 },
  id: { type: String, required: true, max: 100 },
  productos: [
    {
      id: { type: Number, required: false, max: 1000000 },
      name: { type: String, required: false, max: 100 },
      price: { type: Number, required: false, max: 1000000 },
      stock: { type: Number, required: false, max: 1000000 }
    }
  ]
});
const cart = mongoose.model(carritoCollection, cartSchema);
module.exports = cart;
//module.exports = { cartSchema, carritoCollection };
