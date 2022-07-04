const auth = (req, res, next) => {
  if (req.session.user.id) {
    next();
  } else {
    res.redirect("/")
  }
};

module.exports = auth;
