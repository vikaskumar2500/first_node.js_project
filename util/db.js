const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "sys",
  password: "vikas",
  host: "localhost",
  user: "root",
  port:3306
});

module.exports= pool.promise();
