const usersModel = require("../models/usersModel");

///////////////////////////////////////////////////////////////////////////////////
//Validate user request field
/////////////////////////////////////////////////////////////////////////////////////
module.exports.validateUserRequestField = (req, res, next) => {
  try {
    //Function to check for email regular expression
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    //Checking for email input
    //Username cannot be undefined nor A Integer | Email cannot be undefined and have to follow email regular expression | Password cannot be undefined
    if (
      req.body.username == undefined ||
      req.body.email == undefined ||
      req.body.password == undefined ||
      !isNaN(req.body.username) ||
      !validateEmail(req.body.email)
    ) {
      res.status(400).json({
        message:
          "Bad request. Please provide valid values for 'Username', 'Email' and 'Password'.",
      });
      return;
    }
    //If everything is ok
    next();
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

///////////////////////////////////////////////////////////////////////////////////
//Check if user exists by email
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkUserExistsByEmail = (req, res, next) => {
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
          //If user exists
          next();
        } else {
          res.status(404).json({
            message: "Wrong login credentials or password",
          });
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
//Check if user exists by user id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkUserExistsByUserId = (req,res,next) =>{
  try{
    const data = {
      userId: req.params.userId
    }

    usersModel.readUserByUserId(data, (error,results)=>{
      if(error){
        console.log("Error reading user by user ID: ", error);
        res.status(500).json({
          message: "Internal Server Error reading user by user ID.",
        });
      }else{
        if(results.length > 0){
          //If user exists
          next()
        }else{
          //If user doesnt exists
          res.status(404).json({
            message: "User not found",
          });
        }
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////
// Read user by username
/////////////////////////////////////////////////////////////////////////////////////
module.exports.loginByEmail = (req, res, next) => {
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
        //Put the userID into the res.locals
        res.locals.userId = results[0].user_id;
        //Put password into locals
        res.locals.hash = results[0].password;
        //If user exists
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

///////////////////////////////////////////////////////////////////////////////////
// Delete user by user ID
/////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteUserByUserId = (req,res) => {
  try{
    const data = {
      userId: req.params.userId
    }

    usersModel.deleteUserByUserId(data, (error,results)=>{
      if(error){
        console.log("Error deleting user by user ID: ", error);
        res.status(500).json({
          message: "Internal Server Error deleting user by user ID.",
        });
      }else{
        res.status(204).send()
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


///////////////////////////////////////////////////////////////////////////////////
// Update user details by id user by user ID
/////////////////////////////////////////////////////////////////////////////////////
module.exports.updateUserDetailsByUserId = (req,res) =>{
  try{
    const data = {
      userId: req.params.userId,
      username: req.body.username,
      email: req.body.email
    }

    usersModel.updateUserDetailsByUserId(data, (error,results)=>{
      if(error){
        console.log("Error updating user by user ID: ", error);
        res.status(500).json({
          message: "Internal Server Error updating user by user ID.",
        });
      }else{
        res.status(200).json({
          message:"User updated successfully"
        })
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////
// Get the current user password for validation
/////////////////////////////////////////////////////////////////////////////////////
module.exports.obtainCurrentUserPassword = (req,res,next) =>{
  try{
    const data = {
      userId:req.params.userId
    }

    usersModel.readUserByUserId(data, (error,results)=>{
      if(error){
        console.log("Error obtaining current user password: ", error);
        res.status(500).json({
          message: "Internal Server Error obtaining current user password.",
        });
      }else{
        res.locals.hash = results[0].password
        next()
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////
// Update user password
/////////////////////////////////////////////////////////////////////////////////////
module.exports.updateUserPasswordByUserId = (req,res) =>{
  try{
    const data = {
      userId:req.params.userId,
      password: res.locals.hash
    }

    usersModel.updateUserPasswordByUserId(data, (error,results)=>{
      if(error){
        console.log("Error updating user password by user ID: ", error);
        res.status(500).json({
          message: "Internal Server Error updating user password by user ID.",
        });
      }else{
        res.status(200).json({
          message:"Password updated successfully"
        })
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


///////////////////////////////////////////////////////////////////////////////////
// Read user credentials
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readUserCredentialsByUserId = (req,res) =>{
  try{
    const data = {
      userId:req.params.userId,
    }

    usersModel.readUserByUserId(data, (error,results)=>{
      if(error){
        console.log("Error reading user by user ID: ", error);
        res.status(500).json({
          message: "Internal Server Error reading user by user ID.",
        });
      }else{
       res.status(200).json({
        user_id: results[0].user_id,
        username: results[0].username,
        email: results[0].email
       })
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}