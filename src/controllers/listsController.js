const listsModel = require("../models/listsModel");

///////////////////////////////////////////////////////////////////////////////////
// Create new list
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createNewList = (req, res, next) => {
  try {
    const data = {
      //Get user id from the verify token
      userId: res.locals.userId,
      listName: req.params.list_name,
    };

    listsModel.insertSingleList(data, (error, results) => {
      if (error) {
        console.log("Error creating new list: ", error);
        res.status(500).json({
          message: "Internal Server Error creating new list.",
        });
      } else {
        res.status(201).json({
          message: "List created",
        });
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
// Check if list belong to use
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkListBelongToUser = (req, res, next) => {
  try {
    const data = {
      listId: req.params.listId,
    };

    listsModel.readListByListId(data, (error, results) => {
      if (error) {
        console.log("Error reading list by list id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading list by list id.",
        });
      } else {
        if (results[0].user_id == res.locals.userId) {
          //If list belong to user
          next();
        } else {
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

///////////////////////////////////////////////////////////////////////////////////
// Delete list by list id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteListByListId = (req,res) =>{
    try{
        const data = {
            listId: req.params.listId,
          };
          listsModel.deleteListByListId(data, (error, results)=>{
            if(error){
                console.log("Error deleting list by list id: ", error);
                res.status(500).json({
                  message: "Internal Server Error deleting list by list id.",
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
