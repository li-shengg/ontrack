const pool = require('../services/db')

module.exports.insertSingleUserListRelationship = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO UserList (user_id, list_id) VALUES
    (?, ?);
    `

    const VALUES = [data.userId, data.listId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.readNonDefaultListByUserId  = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM Lists
    INNER JOIN UserList ON Lists.list_id = UserList.list_id
    WHERE user_id = ? AND is_default = ?;
    `

    const VALUES = [data.userId, data.isDefault]

    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.readUserListsByUserIdAndListId = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT * FROM UserList
    WHERE user_id = ? AND list_id = ?
    `

    const VALUES = [data.userId, data.listId]

    pool.query(SQLSTATEMENT, VALUES, callback)
}