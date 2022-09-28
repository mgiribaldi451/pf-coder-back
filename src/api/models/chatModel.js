const mongoose = require("mongoose");

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
    author: { type: String, required: true, max: 100 },
    text: { type: String, required: true, max: 10000000 },
    timestamp: { type: String, required: true, max: 100 }
})
const chat = mongoose.model(chatCollection, chatSchema);
module.exports = chat;