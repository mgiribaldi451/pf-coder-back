const { transporter } = require("../../utils/mailDelivery");
const mailOptions = require("../../utils/mailBuyOptions");
const logger = require("../../utils/logger");
async function mail(datos) {
  try {
    let calcTotal = datos.productos.map(e => {
      return e.price;
    });
    const reducer = (accumulator, curr) => accumulator + curr;
    total = calcTotal.reduce(reducer);
    mailOptions.to = datos.id;
    mailOptions.html = `<h1 style="color: blue;">Nombre:${datos.id}</h1><br><h1 style="color: blue;">Productos comprados: ${datos.productos}</h1><br><h1 style="color: blue;">Total: ${total}</h1><br>`;
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { mail };
