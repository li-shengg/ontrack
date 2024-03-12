const listsModel = require("../models/listsModel");

///////////////////////////////////////////////////////////////////////////////////
// Create new list
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createNewList = (req, res, next) => {
  try {
    const data = {
      //Get user id from the verify token (Default false as the list is newly created by user)
      listName: req.body.list_name,
      isDefault: "false",
    };

    listsModel.insertSingleList(data, (error, results) => {
      // Removed `next` from parameters
      if (error) {
        console.log("Error creating new list: ", error);
        res.status(500).json({
          message: "Internal Server Error creating new list.",
        });
      } else {
        res.locals.listId = results.insertId;
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
// Read list by list ID
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readListByListId = (req, res) => {
  try {
    const data = {
      listId: res.locals.listId || req.params.listId,
    };

    listsModel.readListByListId(data, (error, results) => {
      if (error) {
        console.log("Error reading list by list id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading list by list id.",
        });
      } else {
        const status = req.method === 'POST'?201:200
        res.status(status).json(results[0]);
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
module.exports.deleteListByListId = (req, res) => {
  try {
    const data = {
      listId: req.params.listId,
    };
    listsModel.deleteListByListId(data, (error, results) => {
      if (error) {
        console.log("Error deleting list by list id: ", error);
        res.status(500).json({
          message: "Internal Server Error deleting list by list id.",
        });
      } else {
        res.status(204).send();
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
// Update list by list id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.updateListByListId = (req,res, next) =>{
  try{
    const data = {
      listId: req.params.listId,
      listName: req.body.list_name
    };

    listsModel.updateListByListId(data, (error,results)=>{
      if(error){
        console.log("Error updating list by list id: ", error);
        res.status(500).json({
          message: "Internal Server Error updating list by list id.",
        });
      }else{
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
// Create daily list for new user
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createDailyList = (req, res, next) => {
  try {
    //Default true as the list is default list
    const data = {
      listName: "Daily",
      isDefault: "true",
    };
    listsModel.insertSingleList(data, (error, results) => {
      if (error) {
        console.log("Error creating daily list: ", error);
        res.status(500).json({
          message: "Internal Server Error creating daily list.",
        });
      } else {
        res.locals.listId = results.insertId;
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
