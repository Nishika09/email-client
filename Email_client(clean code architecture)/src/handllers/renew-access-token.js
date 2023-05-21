const { Kafka } = require("kafkajs");
const {OAuth2Client}=require("google-auth-library")
const userUsecase = require("../use-cases/users");
const CronJob = require('cron').CronJob;
console.log(userUsecase)

// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092"],
// });
const CLIENT_ID ="947117482583-54i30iuop0mqf673hqas7pdq0hf2941f.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const client=new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

// const run = async () => {
//   const consumer = kafka.consumer({ groupId: "renew-access-token" });
//   await consumer.connect();
//   await consumer.subscribe({ topic: "renewAccessToken", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const users = JSON.parse(message.value.toString());
//       console.log(users);
//       users.forEach(async(user)=>{
//         client.setCredentials({refresh_token:user.Refresh_Token}); 
//         const tokenResponse=await client.getAccessToken();
//         console.log(tokenResponse);
       
//       });
//     }
//       });
//     }
    
//       //   console.log({
//       //     partition,
//       //     offset: message.offset,
//       //     value: message.value.toString(),
//       //   })
  

// run().catch(console.error);
console.log("consumer");

return async function getAccessToken()
    {
        databasename='database5';
        
        const kafka=new Kafka({
            clientId:'update-acces-token',
            brokers:['localhost:9092']
        });
        const consumer = kafka.consumer({ groupId:'myTokenConsumer' });
        
        await consumer.connect();
        
        await consumer.subscribe({ topic:'userAccessToken'});

        console.log("connected");
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("Message consumed at get getAccesToken",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });
                let result = JSON.parse(message.value);
                for(let user of result.relatedUsers)
                { 
                    console.log("user",user);
                    const REFRESH_TOKEN= user.refresh_token;
                    console.log("refresh token ---"+REFRESH_TOKEN)
                    const { tokens } =  await client.refreshToken(REFRESH_TOKEN);
                    console.log("Token",tokens);
                    userUsecase.updateUserAccesToken
                    const result = await userUsecase.updateUserAccesToken({id:user.id,Access_Token:tokens.access_token,Expiry_Date:tokens.expiry_date,databaseName:"database5"})
                    console.log(result);
                }           
            }
        })
        // await getAccessToken();
    }


// module.exports={
//     getAccessToken
// }