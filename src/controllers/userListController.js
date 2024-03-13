const userListsModel = require("../models/userListsModel");


///////////////////////////////////////////////////////////////////////////////////
// Create new relationship
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createUserListRelationship = (req, res, next) => {
  try {
    const data = {
        userId: res.locals.userId,
        listId: res.locals.listId
    }

    userListsModel.insertSingleUserListRelationship(data, (error,results)=>{
        if(error){
            console.log("Error creating new user list relationship: ", error);
            res.status(500).json({
              message: "Internal Server Error creating new user list relationship.",
            });
        }else{
           next()
        }
    })
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


///////////////////////////////////////////////////////////////////////////////////
// Get lists (Lists that user has created (Not the default list)) by user id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readCustomListByUserId = (req,res) =>{
    try{
      //Read all the non default lists
      const data = {
        userId: req.params.userId,
        isDefault: 'false'
      }
  
      userListsModel.readNonDefaultListByUserId (data, (error,results)=>{
        if(error){
          console.log("Error reading list by user id: ", error);
          res.status(500).json({
            message: "Internal Server Error reading list by user id.",
          });
        }else{
          res.status(200).json(results)
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
// Check if list belong to user
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkListBelongToUser = (req, res, next) => {
    try {
      const data = {
        userId:res.locals.userId,
        listId: req.params.listId,
      };
  
      userListsModel.readUserListsByUserIdAndListId(data, (error, results) => {
        if (error) {
          console.log("Error reading list by list id: ", error);
          res.status(500).json({
            message: "Internal Server Error reading list by list id.",
          });
        } else {
       
         if(results.length>0){
             //If the relationship exists
            next()
         }else{
             //If the relationship dont exists
             res.status(403).json({
                message: "You don't own this list",
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