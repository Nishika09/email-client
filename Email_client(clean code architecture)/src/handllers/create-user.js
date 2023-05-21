const { Kafka } = require('kafkajs')
const Users=require('../use-cases')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const run = async () => {
const consumer = kafka.consumer({ groupId: 'create-user' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'user', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const id=JSON.parse(message.value.toString());
        Users.users.defaultFolders({UserId:id.userId})
        console.log(id);
    //   console.log({
    //     partition,
    //     offset: message.offset,
    //     value: message.value.toString(),
    //   })
    },
  })
}

run().catch(console.error)