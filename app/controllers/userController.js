const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models/associations");

const userController = {
  renderLogin: (req, res) => {
    const title = "Login";
    res.render("login", { title });
  },
  login: async (req, res) => {
    const title = "Login";

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const exists = await User.findAll({
        where: {
          email: email,
        },
      });

      if (exists.length === 0) {
        res.locals.message = "User not found";
        res.render("login", { title });
      } else {
        const user = exists[0].get();
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {id: user.id, email: user.email};
          res.redirect("/tasks");
        } else {
          res.locals.message = "Invalid input";
          res.render("login", { title });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  renderSignUp: (req, res) => {
    const title = "Sign Up";
      res.render("signup", {title});
  },

  signup: async (req, res) => {
    const { email, password, confirmation } = req.body;
    const title = "Sign Up";
    if (password !== confirmation || !password || !confirmation || !email) {
      res.locals.message = "Invalid input";
      console.log("Invalid input");
      res.render("signup", { title });
    } else {
      try {
        // create and save user
      // Check if user exists already
      const exists = await User.findAll({where: {
        email: email
      }});

      if (exists.length === 0) {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const created = await User.create({ email: email, password: hashedPassword });
        console.log("Created", created);
        res.redirect("/login");
      } else {
        res.locals.exists = "User exists. Please log in"
        res.render("signup", { title });
      }
      } catch (error) {
        console.log(error);
      }
    }
  },

  logout: (req, res) => {
    if (req.session.user) {
      req.session = null;
      res.redirect("/login");
    }
  }
};

module.exports = userController;
