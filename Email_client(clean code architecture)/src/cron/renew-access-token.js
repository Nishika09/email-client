const userUseCases=require('../use-cases');
// const { Kafka } = require("kafkajs");
const  CronJob = require('cron').CronJob;
const {OAuth2Client}=require("google-auth-library")
const getAllRelatedUser = userUseCases.users.getAllRelatedUser;
const updateUserAccesToken = userUseCases.users.updateUserAccesToken

const CLIENT_ID ="947117482583-54i30iuop0mqf673hqas7pdq0hf2941f.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/callback";

const client=new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
// const kafka = new Kafka({
//   clientId: "my-app",
//   brokers: ["localhost:9092"],
// });
// const producer =kafka.producer();


// const job = new CronJob(
//     '*/2 * * * * *',
//     async function() {
//         const result=await useCases.users.expiredAcessToken();
//         console.log(result);

    //     await producer.connect();
    //     await producer.send({
    //         topic: "renewAccessToken",
    //         messages: [
    //           {
    //             value: JSON.stringify({
    //              result
    //             }),
    //           },
    //         ],
    //       });

        
    // console.log("message received");
    //   await producer.disconnect();
    // null,
    // true,
    // 'America/Los_Angeles'
// });
// job.start()

function runCron(){
    const job = new CronJob('*/4  * * * * *',async function() {
    console.log('inside cron');
    let databaseName="database5"
    const currentTime=new Date().getTime();
    let relatedUsers = await getAllRelatedUser({currentTime,databaseName});
    
    // await runProducer({relatedUsers});
    console.log('Running a task every minute',JSON.stringify({relatedUsers}));


    for(let user of relatedUsers)
                { 
                    console.log("user",user);
                    const REFRESH_TOKEN= user.Refresh_Token;
                    console.log("refresh token ---"+REFRESH_TOKEN)
                    const { tokens } =  await client.refreshToken(REFRESH_TOKEN);
                    console.log("Token",tokens);
                    // userUseCases.updateUserAccesToken
                    const result = await updateUserAccesToken({id:user.id,Access_Token:tokens.access_token,Expiry_Date:tokens.expiry_date,databaseName:"database5"})
                    console.log(result);
                }  


});

job.start();
}

// async function runProducer({relatedUsers})
// {
// const kafka = new Kafka({
//     clientId:'update-acces-token',
//     brokers:['localhost:9092']
// })

// const producer = kafka.producer();
// await producer.connect();
// await producer.send({
//     topic: 'userAccessToken',
//     messages: [
//         {
//             value:JSON.stringify({relatedUsers})
//         }
//     ]
// })
// console.log("msg sent");
// }


runCron();