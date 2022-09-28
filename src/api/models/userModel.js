const mongoose = require("mongoose");

const usuariosCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({

  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  fullName: { type: String, required: true, max: 100 },
  address: { type: String, required: true, max: 100 },
  phone: { type: String, required: true, max: 100 },
  avatar: {type: String, required: true, max:100}
});

const mongoModel = mongoose.model(usuariosCollection,UsuarioSchema)
module.exports = mongoModel

