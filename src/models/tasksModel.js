const pool = require('../services/db')

module.exports.insertSingleTask = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO Tasks (user_id, task_title, is_important, status)
    VALUES (?,?,?,?);
    `
    const VALUES = [data.userId, data.taskTitle, data.isImportant, data.status]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readTaskByTaskId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Tasks WHERE task_id = ?;
    `
    const VALUES = [data.taskId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readTaskByUserId = (data,callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Tasks WHERE user_id = ?;
    `
    const VALUES = [data.userId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readTaskByTaskImportanceAndUserId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Tasks WHERE is_important = ? AND user_id = ?;
    `
    const VALUES = [data.isImportant, data.userId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.deleteTaskByTaskId = (data, callback) =>{
    const SQLSTATEMENT = `
    DELETE FROM Tasks WHERE task_id = ?;
    `
    const VALUES = [data.taskId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.upateTaskImportanceByTaskId = (data, callback) =>{
    const SQLSTATEMENT = `
    UPDATE Tasks SET is_important = ? WHERE task_id = ?;
    `

    const VALUES = [data.isImportant, data.taskId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.updateTaskStatusByTaskId = (data, callback) =>{
    const SQLSTATEMENT = `
    UPDATE Tasks SET status = ? WHERE task_id = ?;
    `

    const VALUES = [data.status, data.taskId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.updateTaskTitleByTaskId = (data, callback) =>{
    const SQLSTATEMENT = `
    UPDATE Tasks SET task_title = ? WHERE task_id = ?;
    `
    const VALUES = [data.taskTitle, data.taskId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}