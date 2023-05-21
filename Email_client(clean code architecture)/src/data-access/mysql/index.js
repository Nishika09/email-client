const mysql = require("mysql2");
const makeUserDbMethods = require("./users.db");
const makeEmailFolderDbMethods=require("./Email-Folder.db");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  // database: "email_db",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server: ", err);
  } else {
    console.log("Connected to MySQL server!");
  }
});

con = con.promise();

const users = makeUserDbMethods({ con });
const folders=makeEmailFolderDbMethods({con});

const dbMethods = {
  users,
  folders
};

module.exports = dbMethods;
