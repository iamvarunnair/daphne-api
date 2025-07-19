const mysql = require("mysql2");

const dbPassword = process.env.PASSWORD;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: dbPassword,
  database: "daphne_v1",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = connection;