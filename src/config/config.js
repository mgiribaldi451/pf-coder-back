const dotenv = require("dotenv");

//dotenv.config({ path: "../.env" });
dotenv.config()
const variableEnv = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  mongo_atlas: process.env.MONGO_ATLAS,
  node_test_mail: process.env.NODE_TEST_MAIL,
  node_pass_email: process.env.NODE_PASS_EMAIL,
  node_host_email: process.env.NODE_HOST_EMAIL,
  node_port_email: process.env.NODE_PORT_EMAIL
};

module.exports = variableEnv;
