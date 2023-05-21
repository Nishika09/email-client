const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

module.exports = function makeFetchGmailFolders({ Joi }) {
  return async function fetchGmailFolders({
    UserId,
    databaseName,
    AccessToken,
    RefreshToken
  }) {
    console.info(`Inside fetchGmailFolders use case`);
    console.log(databaseName);
    console.log(UserId);
    console.log(RefreshToken+"mnmn");
    try {
      // Call the database function to fetch Gmail folders of the user
      //   const folders = await usersDb.createEmailFolder({ userId, databaseName });
      console.log("inside producer");
      await producer.connect();
      await producer.send({
        topic: "fetch-folder",
        messages: [
          {
            value: JSON.stringify({
              UserId: UserId,
              databaseName,
              AccessToken: AccessToken,
              RefreshToken:RefreshToken
            }),
          },
        ],
      });
      console.log("message Send");
      await producer.disconnect(); // return the response to the client
      //   return folders;
      //  res.status(201).json(user);
    } catch (err) {
      // handle errors
      console.error(err);
      //  res.status(500).json({ error: 'Internal server error' });
    }
    // return folders;
  };
};
