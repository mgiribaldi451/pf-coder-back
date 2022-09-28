
require("../config/config");
const bCrypt = require("bcrypt");


function validatePass(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = {validatePass , createHash}
