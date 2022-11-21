import { createClient } from 'redis'

const client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
    legacyMode: true
  });

client.connect()

export default client