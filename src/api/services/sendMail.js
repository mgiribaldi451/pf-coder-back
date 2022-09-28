const { transporter } = require("../../utils/mailDelivery");
const mailOptions = require("../../utils/mailOptions");
const logger = require("../../utils/logger");
async function mail(datos) {
  try {
    mailOptions.html = `<h1 style="color: blue;">Nombre:${datos.fullname}</h1><br><h1 style="color: blue;">Username: ${datos.username}</h1><br><h1 style="color: blue;">Password: ${datos.password}</h1><br>`;
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { mail };
