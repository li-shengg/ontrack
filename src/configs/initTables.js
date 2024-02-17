const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS Users;


CREATE TABLE Users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
`;

pool.query(SQLSTATEMENT, (error, results) => {
  if (error) {
    console.log(`Error Creating Table:\n${error}`);
    process.exit();
  } else {
    console.log(`Table Created successfully:\n${results}`);
    process.exit();
  }
});
