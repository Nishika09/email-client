const { Kafka } = require("kafkajs");
const Users = require("../use-cases");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const run = async () => {
  const consumer = kafka.consumer({ groupId: "default-folder" });
  await consumer.connect();
  await consumer.subscribe({ topic: "folder", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const obj = JSON.parse(message.value.toString());
      Users.users.defaultFolders({
        UserId: obj.userId,
        databaseName: obj.databaseName,
      });
      console.log(obj);
      //   console.log({
      //     partition,
      //     offset: message.offset,
      //     value: message.value.toString(),
      //   })
    },
  });
};

run().catch(console.error);
