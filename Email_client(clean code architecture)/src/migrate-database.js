const CONFIG = require('./config');
const fs=require("fs");
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path=require('path');





// const sequelize = new Sequelize(
//     "database5","root","admin",{ dialect: 'mysql',host:'localhost'});

// const umzug = new Umzug({
//   migrations: { glob: './migrations/*.js' },
//   context: sequelize.getQueryInterface(),
//   storage: new SequelizeStorage({ sequelize }),
//   logger: console,
// });
// umzug.up().then(()=>{
//     console.log("migrations performed");
// })
// .catch((err)=>{
//     console.log(`Error: ${err}`);
// });

const sequelize = new Sequelize(
    "database5","root","admin",{ dialect: 'postgres',host:'localhost',port:26257,logging:false, dialectOptions:{

        ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/ca.crt').toString(),
            cert:fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/client.root.crt').toString(),
            key:fs.readFileSync('/home/ad.rapidops.com/nishika.dogne/Downloads/cockroach-v22.2.6.linux-amd64/certs/client.root.key').toString()
          }}});

const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
 
  }
);
umzug.up().then(()=>{
    console.log("migrations performed");
})
.catch((err)=>{
    console.log(`Error: ${err}`);
});



