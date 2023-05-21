const CONFIG= require('../../config');
const fs=require('fs');
const {Pool}=require('pg');

const makeUserDbMethods = require("./users.db");
const makeEmailFolderDbMethods=require("./Email-Folder.db");
const makeEmailsDbMethods=require("./emails.db");
const makeAttachmentsDbMethods=require("./attachments.db");
// let con = new Pool({ 
//   host: CONFIG.cockroachdb.host,
//   user: CONFIG.cockroachdb.user.split(':')[0],
//   password: "admin",
//   port:CONFIG.cockroachdb.port,
  
//   ssl:{
//     ca:CONFIG.cockroachdb.ssl.ca,
//     cert:CONFIG.cockroachdb.ssl.cert,
//     key:CONFIG.cockroachdb.key,
//     rejectUnauthorized:false
//   }
//   // database: "email_db",
// });
const con = new Pool({
 user: CONFIG.cockroach.user.split(':')[0],
  
 host: CONFIG.cockroach.host,
  
 password: CONFIG.cockroach.user.split(':')[1],
  
port: CONFIG.cockroach.port,
// database:CONFIG.cockroach.database,
  
ssl: {
  
 ca: CONFIG.cockroach.ssl.ca,
   cert:CONFIG.cockroach.ssl.cert ,
   key: CONFIG.cockroach.ssl.key,
  
 rejectUnauthorized: false // This line is added to ignore self-signed certificates
  
 }
  
  });
con.connect((err) => {
  if (err) {
    console.error("Error connecting to Cockroach server: ", err);
  } else {
    console.log("Connected to Cockroach server!");
  }
});

// con = con.promise();

const users = makeUserDbMethods({ con });
const folders=makeEmailFolderDbMethods({con});
const emails= makeEmailsDbMethods({con});
const attachments=makeAttachmentsDbMethods({con});
const dbMethods = {
  users,
  folders,
  emails,
  attachments
};

module.exports = dbMethods;
