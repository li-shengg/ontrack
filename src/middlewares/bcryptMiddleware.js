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
                //Wrong Password
                res.status(401).json({
                    message: "Wrong login credentials or password"
                })
            }
        }
    })
}


//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
//////////////////////////////////////////////////////
module.exports.hashPassword = (req,res,next)=>{

    //Password to hash
    const passwordToHash = req.body.password

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