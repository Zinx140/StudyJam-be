const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const access_token = req.cookies?.accessToken;

    if (!access_token) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Access token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Access token expired",
      });
    }

    return res.status(401).json({
      status: "Unauthorized",
      message: "Access token tidak valid",
    });
  }
};

module.exports = authentication;
