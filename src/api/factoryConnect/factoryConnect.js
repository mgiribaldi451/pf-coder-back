const MongoProductDao = require("../DAOs/containerDao");
const variableEnv = require("../../config/config");
const logger = require("../../utils/logger");

const mongo = variableEnv.mongo_atlas;
const opcion = process.argv[2] || "Mongo";
let dao;
switch (opcion) {
  case "Mongo":
    dao = new MongoProductDao(mongo);
    logger.info(`La base de datos sera mongo `);
    dao.init();
    break;
  default:
    dao = new MongoProductDao(mongo);
    logger.info(`base de datos con mongo deefauult (mongo tambien)`);
    dao.init();
    break;
}

module.exports = class ProductDaoFactory {
  static getDao() {
    return dao;
  }
};
