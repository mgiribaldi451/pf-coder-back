const express = require("express");
const mongoose = require("mongoose");
const { chatDaoMongo } = require("../../DAOs/chatDaoMongo");
const logger = require("../../../utils/logger");

const chatDao = new chatDaoMongo("chat");
const router = express.Router();

router.get('/' , async (req , res)=>{

    let chats = await chatDao.getAll("chat");
    console.log(chats);
    res.json({chats})

})

router.post('/' , async (req , res)=>{

    let chats = await chatDao.save(req.body,"chat");
    console.log(req.body);
    res.json({chats})

})

module.exports = router