const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      req.isAuthenticated = false;
    } else {
      req.isAuthenticated = true;
      req.user = user;
    }
    next();
  })(req, res, next);
}

module.exports = { authenticateJWT };
