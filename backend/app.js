import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'

import indexrouter from './routes/index.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.authenticate('session'))

app.use('/api', indexrouter)

app.listen(process.env.PORT)