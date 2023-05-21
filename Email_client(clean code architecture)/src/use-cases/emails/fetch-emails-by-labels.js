const { Kafka } = require("kafkajs");
const usersDb = require("../../data-access/cockroach/Email-Folder.db");
const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

module.exports = function makeFetchEmailsbyLabelUseCase({usersDb}) {
  return async function fetchEmailsByLabelUseCase({
    UserId,
    databaseName,
    AccessToken,
    RefreshToken
  }) {
    console.info(`Inside fetch emails by label use case`);
    console.log(databaseName);
    console.log(UserId);
    try {
      const labelsPriorityMap={};
      const result= await usersDb.fetchLabelsByPriority({UserId,databaseName});
      result.rows.forEach((row)=>{
        const labelName =row.Name;
        const priority=row.Priority;
        labelsPriorityMap[priority]=labelName;
      });

      console.log("labelsPriorityMap:::",labelsPriorityMap);

      console.log("inside producer");
      await producer.connect();
      console.log("producer connected in fetch emails by labels");

      for(const priority in labelsPriorityMap){
        const labelName= labelsPriorityMap[priority];
        let nextPageToken = null;
        console.log(`producing message for label :${labelName},priority:${priority}`);
      
      await producer.send({
        
        topic: "fetching-emails",
        messages: [
          {
            value: JSON.stringify({
              UserId: UserId,
              labelName:labelName,
              Priority:priority,
              databaseName,
              AccessToken: AccessToken,
              RefreshToken:RefreshToken,
              nextPageToken:nextPageToken
            }),
          },
        ],
      });
    }
      console.log("message Send for all labels");
      await producer.disconnect(); // return the response to the client
      
      
    } catch (err) {
      // handle errors
      console.error(err);
      
    }
  
  };
};
