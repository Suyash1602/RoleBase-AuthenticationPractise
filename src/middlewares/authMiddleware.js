const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    let token;
    const auth = req.headers["authorization"];
    
    if (!auth) {
        return res
          .status(403)
          .json({ message: "Unauthorized ,JWT token is required" });
      }
      try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("The decoded user is :",req.user);
        next();
      } catch (error) {
        return res
          .status(403)
          .json({ message: "Unauthorized,JWT token is wrong or expired" });
      }
}


module.exports = verifyToken;