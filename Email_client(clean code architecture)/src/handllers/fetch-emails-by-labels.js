const { google } = require("googleapis");
const { gmail } = require("googleapis/build/src/apis/gmail");
const foldersDb = require("../data-access/cockroach/Email-Folder.db");
const insertEmails = require("../use-cases/emails");
const insertAttachments=require("../use-cases/attachments")
const nextPageTokens = require("./next-token");
const { OAuth2 } = google.auth;
const CLIENT_ID =
  "947117482583-54i30iuop0mqf673hqas7pdq0hf2941f.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const Oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const { Kafka } = require("kafkajs");
const fetchEmailsByLabels = require("../use-cases/emails");
const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});

const run = async () => {
  const consumer = kafka.consumer({ groupId: "gmail-fetch" });
  await consumer.connect();
  console.log("consumer connected in fetch-emails");
  await consumer.subscribe({ topic: "fetching-emails", fromBeginning: false });
  console.log("inside fetch email consumer");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const obj = JSON.parse(message.value.toString());
      console.log("obj:::", obj);

      console.log("userId inside handler:::", obj.UserId);
      console.log("ACCESS TOKEN inside handler:::", obj.AccessToken);
      console.log(("next token:::", obj.nextToken));

      Oauth2Client.setCredentials({
        access_token: obj.AccessToken,
        refresh_token: obj.RefreshToken,
      });
      // Fetch Gmail labels
      const googleGmail = google.gmail({ version: "v1", auth: Oauth2Client });
      // const res = googleGmail.users.messages.list({ userId: "me", labelIds: obj.labelName}, (err, res)=>{
      //   if(err){
      //     console.log(err);
      //     return;
      //   }
      //   const messages = res.data;
      //   console.log(messages);
      // });

      const res = await googleGmail.users.messages.list({
        userId: "me",
        maxResults: 100,
        labelIds: obj.labelName,
        nextPageToken: obj.nextPageToken,
      });
      const messages = res.data.messages;
      console.log(messages);

      const newNextPageToken = res.data.nextPageToken;
      console.log(newNextPageToken);
      console.log(`fetching emails for ${obj.labelName}`);

      for (const message of messages) {
        console.log("Message ID:", message.id);

        // Fetch individual email message by ID
        const messageRes = await googleGmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "FULL",
        });
        const fullMessage = messageRes.data;

        console.log(fullMessage);
        const UserId = obj.UserId;
        const databaseName = obj.databaseName;
        const nextPageToken = obj.nextPageToken;
        const newNextPageToken = res.data.nextPageToken;
        await insertEmails.insertEmailsUsecase({
          messageRes,
          UserId,
          databaseName,
        });

        await insertAttachments.insertAttachmentUsecase({
          messageRes,
          databaseName,
          email_id

        })

        if (newNextPageToken) {
          await nextPageTokens({
            nextPageToken: newNextPageToken,
            labelName: obj.labelName,
            access_token: obj.AccessToken,
            refresh_token: obj.RefreshToken,
            databaseName,
          });
        } else {
          console.log(`All mails of ${labelName} are fetched.`);
          await foldersDb.markFetched({
            labelName,
            UserId,
            databaseName,
          });
        }

        // console.log("Emails:", emails);
        console.log("newNextToken:", newNextPageToken);
        console.log(`Finished fetching emails for label: ${obj.labelName}`);
      }

      console.log(`Fetched and updated  emails for user ${obj.UserId}`);
    },
  });
};

run().catch(console.error);
