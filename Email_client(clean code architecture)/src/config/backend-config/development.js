const fs= require("fs");
const config = {
  mysql: {
    host: "127.0.0.1",
    port: "8080",
    username: "root",
    password: "admin",
    database:"database5",
    dialect: "mysql"
  },
  cockroach: {

     user: "root:admin",
    
     database: "database5",
    
     host: "localhost",
    
     port: 26257,
    
     dialect: "postgresql",
     ssl: {
      ca: fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/ca.crt').toString(),
      cert:fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/client.root.crt').toString(),
      key:fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/client.root.key').toString(),
      rejectUnauthorized: false,
    }
     },
  };

 


module.exports=config;