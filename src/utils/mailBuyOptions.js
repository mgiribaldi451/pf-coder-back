const transporter = require('./mailDeliveryBuy')

const mailOptions = {
    from: 'Servidor Node.js',
    to: "",
    subject: 'Nueva Compra',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
 }

 module.exports = mailOptions