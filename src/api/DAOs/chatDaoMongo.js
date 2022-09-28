const ContainerMongo = require("./containerDao");
const chatModel = require("../models/chatModel");

class chatDaoMongo extends ContainerMongo {
    constructor(a) {
      super(a);
      this.id = 0;
      this.modelChat = chatModel;
      //this.checkId()
    }
}

module.exports = {chatDaoMongo}