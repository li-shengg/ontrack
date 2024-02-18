//////////////////////////////////////////////////////
// REQUIRE BCRYPT MODULE
//////////////////////////////////////////////////////
const bcrypt = require("bcrypt")

//////////////////////////////////////////////////////
// SET SALT ROUNDS
//////////////////////////////////////////////////////
const saltRounds = 10;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
//////////////////////////////////////////////////////
module.exports.comparePassword = (req,res,next)=>{
    //Get the passwords
    const passwordToCheck = req.body.password
    const correctPassword = res.locals.hash

    //Comparing the passwords
    bcrypt.compare(passwordToCheck,correctPassword, (error, isMatch)=>{
        if(error){
            console.error("Error bycrypt:", error)
            res.status(500).json(error)
        }else{
            if(isMatch){
                //If the password match, continue to next
                next()
            }else{
                let message = req.method === "POST" ? "Wrong login credentials or password" : "Password does not match";
                //Wrong Password
                res.status(401).json({
                    message: message
                })
            }
        }
    })
}


//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
//////////////////////////////////////////////////////
module.exports.hashPassword = (req,res,next)=>{

    //Passwords
    //New password (Password to be updated)
    const newPassword = req.body.new_password
    //Password to hash (Default is password when registering)
    let passwordToHash = req.body.password

    //If both password exists means it is updating password
    if(passwordToHash && newPassword){
        //Make the password to hash as the new password
        passwordToHash = newPassword
    }

    //Hashing the password
    bcrypt.hash(passwordToHash, saltRounds, (error,hash)=>{
        if(error){
            console.error("Error bcrypt:", error)
            res.status(500).json(error)
        }else{
            //Store Hashed Password into the locals
            res.locals.hash = hash;
            next()
        }
    })
}