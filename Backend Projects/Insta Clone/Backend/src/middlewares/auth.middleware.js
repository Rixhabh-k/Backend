const jwt = require("jsonwebtoken")

async function verifyUser (req,res,next){
    const token = req.cookies.token;
    
      if (!token) {
        return res.status(401).json({
          message: "token not found",
        });
      }
    
      let decode = null;
    
      try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({
          message: " user is unauthorized",
        });
      }

      req.user = decode
      next()
}

module.exports = verifyUser