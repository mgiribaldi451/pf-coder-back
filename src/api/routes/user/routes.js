const express = require("express");
const axios = require("axios");
const multer = require("multer");
const logger = require("../../../utils/logger");
const { mail } = require("../../services/sendMail");
const passport = require("passport");
const ProductDaoFactory = require("../../factoryConnect/factoryConnect");
require("../../../utils/bcrypt");

const router = express.Router();

//ProductDaoFactory.getDao();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve("../../public/uploads/avatar"));
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/getLogin", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("profile");
  } else {
    res.render("login");
  }
});

router.post(
  "/postLogin",
  passport.authenticate("login", { failureRedirect: "/user/faillogin" }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("Profile");
    } else {
      res.render("login");
    }
  }
);

router.get("/failLogin", (req, res) => {
  logger.warn(`Hubo un problema al iniciar session`);
  res.render("login-error", {});
});

router.get("/profile", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    let resp = await axios
      .get("http://localhost:8080/prods/Products")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        logger.error(error);
      });

    res.render("profileUser", { user: user, resp, isUser: true });
  } else {
    res.redirect("login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/user/failsignup" }),
  upload.single("avatar"),
  (req, res) => {
    if (req.isAuthenticated()) {
      mail(req.body);

      res.redirect("profile");
    } else {
      res.redirect("login");
    }
  }
);

router.get("/carrito", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let resp = await axios
      .get(`http://localhost:8080/carrito/cartuser/${user}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        logger.error(error);
      });

    res.render("carrito", { user: user, resp, isUser: true });
  }
});

router.get("/chats", async (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user.username;
    let resp = await axios
      .get(`http://localhost:8080/chat/`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        logger.error(error);
      });

    res.render("chat", { user: user,resp, isUser: true });
  }
});


router.get("/failsignup", (req, res) => {
  logger.warn(`Hubo un problema al crear el usuario`);
  res.render("signup-error", {});
});

router.get("/ruta-protegida", (req, res) => {
  if (req.isAuthenticated()) {
    logger.info(`Se logueo con exito en la Ruta: /login`);
    res.render("protected");
    next();
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
