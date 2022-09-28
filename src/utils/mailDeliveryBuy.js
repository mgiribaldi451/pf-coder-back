const nodemailer = require("nodemailer");
const enviroment = require("../config/config");

const MAILENV = enviroment.node_test_mail;

const transporter = nodemailer.createTransport({
  host: enviroment.node_host_email,
  port: enviroment.node_port_email,
  auth: {
    user: MAILENV,
    pass: enviroment.node_pass_email
  }
});

module.exports = { transporter, MAILENV };
