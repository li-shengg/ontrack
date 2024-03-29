const pool = require("../services/db");

module.exports.readUserByUsername = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Users.user_id, Users.username, Users.email
    FROM Users WHERE username = ?;
    `;
  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.readUserByEmail = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT Users.user_id, Users.username, Users.email
    FROM Users WHERE email = ?;
    `;
  const VALUES = [data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertSingleUser = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Users (username,email,password) 
    VALUES  (?,?,?);
    `;
  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.readUserByEmail = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Users WHERE email = ?;
    `;

  const VALUES = [data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.readUserByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM Users WHERE user_id = ?;
  `;

  const VALUES = [data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteUserByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  DELETE FROM Users WHERE user_id = ?;
  `;

  const VALUES = [data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};


module.exports.updateUsernameByUserId = (data, callback) =>{
  const SQLSTATEMENT = `
  UPDATE Users SET username = ?
  WHERE user_id = ?;
  `;

  const VALUES = [data.username, data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUserDetailsByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE Users SET username = ?, email = ? 
  WHERE user_id = ?;
  `;

  const VALUES = [data.username, data.email, data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateUserPasswordByUserId = (data, callback) => {
  const SQLSTATEMENT = `
  UPDATE Users SET password = ?
  WHERE user_id = ?;
  `;

  const VALUES = [data.password, data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};
