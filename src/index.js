const express = require("express");
const api = require("./api/routes");
const handlebars = require("express-handlebars");
const session = require("express-session");
const app = express();


app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "coderhouse",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 6000
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
  })
);


 app.use("/api/", api);


module.exports = app;