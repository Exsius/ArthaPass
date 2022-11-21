import { user } from '../models/index.js'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'

const use = passport.use(new LocalStrategy(async (username, password, callback) => {

    const selectedUser = await user.findOne({ where: { email: username } })

    if (selectedUser) {
        bcrypt.compare(password, selectedUser.password, (err, match) => {
            if (err) { return callback(err) }
            if (match) {
                return callback(null, selectedUser)
            } else {
                return callback(null, false, { message: 'incorrect password.' })
            }
        })
    } else {
        return callback(null, false, { message: 'user does not exist.' })
    }
}))

export const serializeUser = passport.serializeUser((user, callback) => {
    callback(null, { id: user.id, email: user.email })
})

export const deserializeUser = passport.deserializeUser((user, callback) => {
    callback(null, user)
})

export default use