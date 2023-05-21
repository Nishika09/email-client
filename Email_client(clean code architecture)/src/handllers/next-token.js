const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

module.exports = function makeNextPageTokenProducer({}) {
  return async function nextPageToken({
    nextPageToken,
    labelName,
    databaseName,
    AccessToken,
    RefreshToken
  }) {
    console.info(`Inside next page token producer`);
    console.log(databaseName);
    console.log(UserId);
    console.log(RefreshToken+"::RefreshToken");
    console.log(nextPageToken,"nexttoken");
    try {
      // Call the database function to fetch Gmail folders of the user
      //   const folders = await usersDb.createEmailFolder({ userId, databaseName });
      console.log("inside producer");
      await producer.connect();
      await producer.send({
        topic: "fetching-emails",
        messages: [
          {
            value: JSON.stringify({
             nextPageToken:nextPageToken,
             labelName:labelName,
              databaseName,
              AccessToken: AccessToken,
              RefreshToken:RefreshToken
            }),
          },
        ],
      });
      console.log("message Send from next token producer");
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
