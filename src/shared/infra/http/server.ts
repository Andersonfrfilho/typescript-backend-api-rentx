import { app } from "@shared/infra/http/app";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['host.docker.internal:9094']
});
const consumer = kafka.consumer({groupId: 'certificate-group'+Math.random()})
async function run(){
  await consumer.connect()
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`- ${message.value}`)
    },
  })
  app.listen(3333, () => console.log("Server is running!"));
}

run()