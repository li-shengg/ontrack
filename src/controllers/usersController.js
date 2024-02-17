const usersModel = require("../models/usersModel");

///////////////////////////////////////////////////////////////////////////////////
//Check duplicate username
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkDuplicateUsername = (req, res, next) => {
  try {
    const data = {
      username: req.body.username,
    };
    usersModel.readUserByUsername(data, (error, results) => {
      if (error) {
        console.log("Error reading user by username: ", error);
        res.status(500).json({
          message: "Internal Server Error reading user by username.",
        });
      } else {
        //If user with the username exists
        if (results.length > 0) {
          res.status(409).json({
            message:
              "User with the provided username already exists. Please choose a different username.",
          });
        } else {
          //If username dont exists
          next();
        }
      }
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
//Check duplicate email
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkDuplicateEmail = (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
    };

    usersModel.readUserByEmail(data, (error, results) => {
      if (error) {
        console.log("Error reading user by email: ", error);
        res.status(500).json({
          message: "Internal Server Error reading user by email.",
        });
      } else {
        if (results.length > 0) {
          //If user with the email exists
          res.status(409).json({
            message:
              "User with the provided email already exists. Please choose a different email.",
          });
        } else {
          //If user with the email dont exists
          next();
        }
      }
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
//Create user
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createUser = (req, res, next) => {
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: res.locals.hash,
    };

    usersModel.insertSingleUser(data, (error, results) => {
      if (error) {
        console.log("Error creating user: ", error);
        res.status(500).json({
          message: "Internal Server Error creating user.",
        });
      } else {
        //Send locals and user id
        res.locals.message = `User created successfully`;
        res.locals.userId = results.insertId;
        next();
      }
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
