const initSession = (req, _, next) => {
    if (!req.session.user) {
      req.session.user = {};
    }
    next();
  }

module.exports = initSession;