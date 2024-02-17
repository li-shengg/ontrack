const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS List;
DROP TABLE IF EXISTS Tasks;

CREATE TABLE Users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Lists(
  list_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  list_name TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Tasks(
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  list_id INT,
  task_description TEXT,
  status ENUM('Completed', 'Incomplete'),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES Lists(list_id)
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
