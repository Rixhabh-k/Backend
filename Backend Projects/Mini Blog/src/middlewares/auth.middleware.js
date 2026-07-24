const jwt = require("jsonwebtoken");

async function verifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not given",
    });
  }

  let decode;

  try {
    decode = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "token is not valid",
    });
  }

  req.user = decode

  next()
}

module.exports = verifyUser