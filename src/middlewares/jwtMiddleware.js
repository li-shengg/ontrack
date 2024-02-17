//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();

//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.generateToken = (req, res, next) => {
  const payload = {
    userId: res.locals.userId,
    timestamp: new Date(),
  };

  //Token settings (Algorithm and Duration)
  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: tokenDuration,
  };

  //Generating a token
  const token = jwt.sign(payload, secretKey, options, (error, token) => {
    if (error) {
      console.log("Error jwt: ", error);
      res.status(500).json(error);
    } else {
      //Put the generated token into locals
      res.locals.token = token;
      next();
    }
  });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
  res.status(200).json({
    message: res.locals.message,
    loggedInUserId: res.locals.userId,
    token: res.locals.token,
  });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
  //Authorization token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  //If token is present
  const token = authHeader.substring(7);

  //If provided token is in wrong format
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ error: "Invalid token" });
    }

    //Decode the token and set the user ID into the locals
    res.locals.userId = decoded.userId;
    res.locals.tokenTimestamp = decoded.timestamp;
    next();
  });
};
