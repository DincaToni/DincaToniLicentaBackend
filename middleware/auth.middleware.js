const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token = req.body.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("user id: " + decoded.userId);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      next(new Error("Acces refuzat, token incorect"));
    }
  } else {
    res.status(401);
    next(new Error("Acces refuzat, token inexistent"));
  }
};

module.exports = { protect };
