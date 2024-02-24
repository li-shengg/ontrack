const pool = require('../services/db')


module.exports.insertSingleList = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO Lists (user_id, list_name) VALUES
    (?, ?);
    `
    const VALUES = [data.userId, data.listName]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readListByListId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Lists WHERE list_id = ?;
    `

    const VALUES = [data.listId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.deleteListByListId = (data, callback) =>{
    const SQLSTATEMENT = `
    DELETE FROM Lists WHERE list_id = ?;
    `
    const VALUES = [data.listId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.readListByUserId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Lists WHERE user_id = ?;
    `

    const VALUES = [data.userId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}