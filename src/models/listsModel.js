const pool = require('../services/db')


module.exports.insertSingleList = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO Lists (list_name, is_default) VALUES
    (?, ?);
    `
    const VALUES = [data.listName, data.isDefault]

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