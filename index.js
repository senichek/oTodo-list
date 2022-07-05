require("dotenv").config();
const express = require("express");
const router = require("./app/router");
var expressSession = require('cookie-session');
const createSession = require("./app/middlewares/session_init");

const app = express();

const port = process.env.PORT || 1234;

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'https://to-do-list-olexiy.herokuapp.com/'
}));

//app.set('trust proxy', 1) // trust first proxy
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // One houre
    },
  })
);

app.use(createSession);

app.use(router);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
