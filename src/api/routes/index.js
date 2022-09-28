const express = require("express");
const users = require("./user/routes");
const productos = require("./productos/routesProds");
const carritos = require("./carrito/cartRoutes");
const chats = require("./chat/chatRoutes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bp = require("body-parser");
const cookieParse = require("cookie-parser");
const auxStrategy = require("../../utils/bcrypt");
const User = require("../models/userModel");
const logger = require("../../utils/logger");
const axios = require("axios");
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const ProductDaoFactory = require("../factoryConnect/factoryConnect");

const app = express();
let port = 8080;
const httpServer=new HttpServer(app)
const io = new IOServer(httpServer);


app.use(
  session({
    secret: "coderhouse",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use(cookieParse());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('/src/public'));
// PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy((username, password, callback) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        logger.warn("Invalid user");
        return callback(null, false);
      }

      if (!auxStrategy.validatePass(user, password)) {
        logger.warn("Invalid Password");
        return callback(null, false);
      }

      return callback(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          logger.error("Hay un error al registrarse");
          return callback(err);
        }

        if (user) {
          logger.warn("El usuario ya existe");
          return callback(null, false);
        }

        const newUser = {
          username: req.body.username,
          password: auxStrategy.createHash(req.body.password),
          fullName: req.body.fullname,
          address: req.body.address,
          phone: req.body.phone,
          avatar: req.body.avatar
        };

        let resp = axios
          .post("http://localhost:8080/carrito/cart", {
            timestamp: Date.now().toString(),
            id: req.body.username,
            productos: []
          })
          .then(response => {
            logger.info(`Carrito Creado para el uusuario ${req.body.username}`);
          })
          .catch(error => {
            logger.error(error);
          });

        User.create(newUser, (err, userWithId) => {
          if (err) {
            logger.error("Hay un error al crear el usuario");
            return callback(err);
          }

          logger.info("Registro de usuario satisfactoria");

          return callback(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id, callback);
});

app.get("/", (req, res) => {
  res.render("main");
});
app.get("/logout", (req, res) => {
  req.logout(err => {
    if (!err) {
      res.render("main");
    }
  });
});
ProductDaoFactory.getDao();
//app.use("/static", express.static('./static/'));
app.use("/user", users,express.static('./public/'));
app.use("/prods", productos);
app.use("/carrito", carritos);
app.use("/chat", chats);


let messages
io.on('connection', function(socket) {
  
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

  socket.on('new-message', async function(data) {
    console.log(data);
      messages.push(data); // agregar mensajes a array 
      io.sockets.emit('messages', messages); //emitir a todos los clientes
      let save = await axios.post('https://localhost/chat',data)
  });
  
});

const server = app.listen(port, () => {
  logger.info(`Server on port ${port}`);

  server.on("error", error => logger.error(`Error en el servidor ${error}`));
});

//httpServer.listen(3000, ()=>logger.info('http Server ON'))

module.exports = app;
