const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Token from Cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Token from Authorization Header
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    if (!token) {
      return res.status(401).json({
        message:
          "Not authorized, no token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "Auth Error:",
      error.message
    );

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;