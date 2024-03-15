///////////////////////////////////////////////////////////////////////////////////
// Search task
/////////////////////////////////////////////////////////////////////////////////////

module.exports.searchTasks = (req,res) =>{
    try{
        const allUserTasks = res.locals.allUserTasks

        const prompt = req.query.q

        const matchingTasks = allUserTasks.filter(task=>{
            return task.task_title.includes(prompt)
        })

        res.status(200).json(matchingTasks)
    }catch{
        console.log("Internal Server Error: ", error);
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}