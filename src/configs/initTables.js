const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS UserLists;
DROP TABLE IF EXISTS TasksLists;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Lists;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Lists(
  list_id INT AUTO_INCREMENT PRIMARY KEY,
  list_name TEXT,
  is_default ENUM('true', 'false') DEFAULT 'false'
);

CREATE TABLE Tasks(
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  task_title TEXT,
  is_important ENUM('true', 'false') DEFAULT 'false',
  status ENUM('Completed', 'Incomplete') DEFAULT 'Incomplete',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE UserLists (
  user_id INT,
  list_id INT,
  PRIMARY KEY (user_id, list_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES Lists(list_id) ON DELETE CASCADE
);

CREATE TABLE TasksLists(
  task_id INT,
  list_id INT,
  PRIMARY KEY (task_id, list_id),
  FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES Lists(list_id) ON DELETE CASCADE
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
