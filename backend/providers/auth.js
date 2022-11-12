import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'

export default passport.use(new LocalStrategy(async (username, password, callback) => {

    const selectedUser = await User.findOne({ where: { username: username } })

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
    callback(null, user)
})

export const deserializeUser = passport.deserializeUser((user, callback) => {
    callback(null, user)
})