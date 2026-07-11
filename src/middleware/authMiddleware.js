const  Jwt  = require("jsonwebtoken");

const authenticationMiddleware = async function (req, res, next) {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        error: "Authorization header must start with Bearer"
      });
    }

    const token = tokenHeader.split(" ")[1];

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }
};
const ensureAuthenticated = async function(req,res,next){
    if(!req.user){
        return res.status(401).json({error:'You must be autenticated'})
    }
    next();
}
const restrictRole =  function (role){
  return function(req,res,next){
    if(req.user.role !== role){
      return res.status(401).json({error: 'you are not authorizes to access it '})
    }
    return next();
  }
}
module.exports ={
    authenticationMiddleware,
    restrictRole,
    ensureAuthenticated
}
