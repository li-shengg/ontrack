const pool = require('../services/db')


module.exports.insertSingleTaskListRelationship = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO TaskList (task_id, list_id) VALUES
    (?, ?);
    `

    const VALUES = [data.taskId, data.listId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readTasksByListId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT Tasks.task_id, Tasks.user_id, Tasks.task_title, Tasks.is_important, Tasks.status, Tasks.created_at
    FROM TaskList
    INNER JOIN Lists ON TaskList.list_id = Lists.list_id
    INNER JOIN Tasks ON TaskList.task_id = Tasks.task_id
    WHERE TaskList.list_id = ?;
    `

    const VALUES = [data.listId]
    pool.query(SQLSTATEMENT, VALUES, callback)
}