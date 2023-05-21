const express = require("express");
const app = express();
const config = require("./config");
const router = require("./rest-service");

const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening at port http://localhost:${port}/auth`);
});

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function run() {
//   console.log('Start');

//   await sleep(15000); // sleep for 5 seconds

//   console.log('End');
// }

// run();
