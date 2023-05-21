// const { Kafka } = require("kafkajs");
// const Users = require("../use-cases");

// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092"],
// });

// const run = async () => {
//     const consumer = kafka.consumer({ groupId: "fetch-labels" });
//     await consumer.connect();
//     await consumer.subscribe({ topic: "folder", fromBeginning: true });

//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const obj = JSON.parse(message.value.toString());
//         Users.users.defaultFolders({
//           UserId: obj.userId,
//           databaseName: obj.databaseName,
//           Access_Token:obj.Access_Token
//         });
//         console.log(obj);
//         //   console.log({
//         //     partition,
//         //     offset: message.offset,
//         //     value: message.value.toString(),
//         //   })
//       },
//     });
//   };

//   run().catch(console.error);
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const CLIENT_ID =
  "947117482583-54i30iuop0mqf673hqas7pdq0hf2941f.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const Oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const { Kafka } = require("kafkajs");
const checkExistingFolder = require("../use-cases/email-folders");

const EmailFolders = require("../use-cases/email-folders");
const updateProviderId = require("../use-cases/email-folders");
const fetchEmailsByLabels=require("../use-cases/emails");
const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});

const run = async () => {
  const consumer = kafka.consumer({ groupId: "gmail-labels" });
  await consumer.connect();
  await consumer.subscribe({ topic: "fetch-folder", fromBeginning: false });
  console.log("jhdfdhfhd");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const obj = JSON.parse(message.value.toString());

      // Fetch access token from database using refresh token
      //   const accessToken = await Users.users.getAccessToken({
      //     UserId: obj.userId,
      //     databaseName: obj.databaseName,
      //   });
      console.log("ACCESS TOKEN inside handler:::", obj.AccessToken);
      console.log("refresh TOKEN inside handler:::", obj.RefreshToken);
      //   const oauth2Client = new google.auth.OAuth2();

      Oauth2Client.setCredentials({ access_token: obj.AccessToken,refresh_token:obj.RefreshToken });
      // Fetch Gmail labels
      const gmail = google.gmail({ version: "v1", auth: Oauth2Client });

      const res = await gmail.users.labels.list({ userId: "me" });
      console.log(res);

      console.log("LABELS:::", res.data.labels);

      const labels = [];
      let priority = 6;

      for (const label of res.data.labels) {
        let labelPriority;

        // Assign priorities 1 to 5 for specific labels, and default priority for the rest
        if (label.id === "INBOX") {
          labelPriority = 1;
        } else if (label.id === "IMPORTANT") {
          labelPriority = 2;
        } else if (label.id === "SENT") {
          labelPriority = 3;
        } else if (label.id === "STARRED") {
          labelPriority = 4;
        } else if (label.id === "DRAFT") {
          labelPriority = 5;
        } else {
          labelPriority = priority;
          priority++; // Increment priority for labels after the first five
        }

        labels.push({
          id: label.id,
          name: label.name,
          priority: labelPriority,
        });
      }

      // Update email folder table
      for (let i = 0; i < labels.length; i++) {
        console.log("label name:::", labels[i].name);
        console.log("priority:::::", labels[i].priority);
        const existFolder = await checkExistingFolder.existingFolder({
          Name: labels[i].name,
          UserId: obj.UserId,
          databaseName: obj.databaseName,
        });
        console.log(existFolder, "EXIST FOLDER");
        if (existFolder === 0) {
          await EmailFolders.createEmailFolder({
            Name: labels[i].name,
            ProviderId: res.data.labels[i].id,
            Priority: labels[i].priority,
            UserId: obj.UserId,
            databaseName: obj.databaseName,
          });
        } else {
          console.log("jdfhdshfds");

          await updateProviderId.updateProviderId({
            Name: labels[i].name,
            ProviderId: res.data.labels[i].id,
            Priority: labels[i].priority,
            UserId: obj.UserId,
            databaseName: obj.databaseName,
          });
          console.log("inside mill gya");
        }
      }

      const UserId=obj.UserId;
      const databaseName=obj.databaseName;
      const AccessToken=obj.AccessToken;
      const RefreshToken=obj.RefreshToken;
      console.log("access token::",AccessToken);
      console.log("refresh token::",RefreshToken);
      console.log(obj.UserId);
      console.log(`Fetched and updated labels for user ${obj.UserId}`);

      await fetchEmailsByLabels.fetchEmailsByLabelUseCase({UserId,databaseName,AccessToken,RefreshToken});
    },
  });
};

run().catch(console.error);








      // for (const label of res.data.labels) {
      //   const folder = {
      //     Name: label.name,
      //     ProviderId: label.id,
      //     Priority: labels.priority,
      //     UserId: obj.UserId,
      //   };
      //   console.log(labels.priority + "ppppp");
      //   console.log(folder.Name);

      //   const existFolder = await checkExistingFolder.existingFolder({
      //     Name: folder.Name,
      //     UserId: folder.UserId,
      //     databaseName: obj.databaseName,
      //   });
      //   if (existFolder == 0) {
      //     await EmailFolders.createEmailFolder({
      //       Name: folder.Name,
      //       ProviderId: folder.ProviderId,
      //       Priority: folder.Priority,
      //       UserId: folder.UserId,
      //       databaseName: obj.databaseName,
      //     });
      //   } else {
      //     console.log("jdfhdshfds");

      //     await updateProviderId.updateProviderId({
      //       Name: folder.Name,
      //       ProviderId: folder.ProviderId,
      //       Priority: folder.Priority,
      //       UserId: folder.UserId,
      //       databaseName: obj.databaseName,
      //     });
      //     console.log("inside mill gya");
      //   }
      // }
      