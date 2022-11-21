import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import { URL } from 'url'
import redisClient from './configs/redis-config.js'
import connectRedis from 'connect-redis'
const redisStore = connectRedis(session)

import authrouter from './routes/auth.js'
import indexrouter from './routes/index.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(flash())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new redisStore({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          client: redisClient,
          ttl: 24 * 60 * 60, // hours * minutes * seconds
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: Boolean(process.env.SSL) || false,
          maxAge: 24 * 60 * 60 * 1000, // hours * minutes * seconds * ms
          httpOnly: true,
        },
        name: 'sid'
      })
)

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
      res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
  })
}

app.use(passport.authenticate('session'))

app.use('/api', indexrouter)
app.use(express.static(new URL('./public', import.meta.url).pathname))


app.listen(5000)