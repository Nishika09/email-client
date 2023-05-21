// module.exports = function makeCreateUserUseCase({ usersDb }) {
//   return async function createUserUsecase({ body }) {
//     console.info(`Inside create user use case`);
//     const result = await usersDb.createUser({ body });
//     return result.insertId;
//   };
// };

// const { Kafka } = require("kafkajs");
// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092"],
// });
// const producer = kafka.producer();

const existingUser = require("../../use-cases/users");
const Joi = require("joi");

module.exports = function makeCreateUserUseCase({ usersDb, Joi ,defaultFolders}) {
  return async function createUserUsecase({
    Name,
    Email,
    Password,
    databaseName,
    Access_Token,
    Refresh_Token,
    Expiry_Date,
  }) {
    console.info(`Inside create user use case`);

    // Define the validation schema
    const schema = Joi.object({
      Name: Joi.string().required(),
      Email: Joi.string().email().required(),
      Password: Joi.string().min(6).required(),
    });

    // Validate the input body
    const { error } = schema.validate({ Name, Email, Password });
    if (error) {
      // throw new Error(`Validation error: ${error.details[0].message}`);
      throw new Error(`${error.details[0].message}`);
    }
    try {
      
      const result = await usersDb.createUser({
        Name,
        Email,
        Password,
        databaseName,
        Access_Token,
        Refresh_Token,
        Expiry_Date,
      });
      console.log("rrrrrrr"+result);

      await defaultFolders({UserId:result,databaseName});
      //  }
      //  else{
      //   console.log("user already exists");
      //  }
      // const {result} = await usersDb.createUser({ Name, Email, Password ,databaseName,Access_Token,Refresh_Token,Expiry_Date});
      // console.log(result);
      // console.log("inside producer");
      // await producer.connect();
      // await producer.send({
      //   topic: "folder",
      //   messages: [
      //     {
      //       value: JSON.stringify({
      //         userId: result,
      //         databaseName,
      //       }),
      //     },
      //   ],
      // });
      // console.log("message received");
      // await producer.disconnect(); // return the response to the client
      // return result;
      //  res.status(201).json(user);
    } catch (err) {
      
      console.error(err);
      //  res.status(500).json({ error: 'Internal server error' });
    }



    // return result;
  };
};
