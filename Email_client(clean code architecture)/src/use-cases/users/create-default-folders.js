module.exports = function makeDefaultFolders({ usersDb }) {
  return async function defaultFoldersUseCase({ UserId ,databaseName}) {
    console.info(`Inside default folder user use case`);
    console.log(databaseName);
    const result = await usersDb.defaultFolders({ UserId,databaseName });
    return result;
  };
};

// const { Kafka } = require('kafkajs');
// const kafka = new Kafka({
//    clientId: 'my-app',
//    brokers: ['localhost:9092']
//   });
//   const producer = kafka.producer();


// module.exports = function makeDefaultFolders({ usersDb }) {
//   return async function defaultFoldersUseCase({ UserId }) {
//     console.info(`Inside default folder user use case`);
//     try{
//     const result = await usersDb.defaultFolders({ UserId });
//       console.log("inside producer");
//     await producer.connect();
//      await producer.send({
//      topic: 'folder',
//      messages: [
//      {
//      value: JSON.stringify({
//      userId: result,
//      }),
//      },
//      ],
//      });
//      console.log("message received");
//      await producer.disconnect(); // return the response to the client
//      return result;
//     //  res.status(201).json(user);
//      }catch (err) {
//        // handle errors
//        console.error(err);
//       //  res.status(500).json({ error: 'Internal server error' });
//       }
      
//     console.log(result);
//     console.log(result.rowCount);
//     return result;
//   };
// };
