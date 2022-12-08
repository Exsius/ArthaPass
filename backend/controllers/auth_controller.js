import { user } from '../models/index.js'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).send({ user_id: req.user.id, refreshToken: token })
    req.session.refreshToken = token
    req.session.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const refreshToken = (user) => {
    const { refreshToken } = req.body
    if (req.session.refreshToken === refreshToken) {
        const newToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        req.session.accessToken = newToken
        res.send(newToken)
    } else {
        res.send({ error: 'invalid refresh token' })
    }
}

export const logout = async (req, res) => {
    try {
        await req.logout
        req.session.destroy((err) => {
            if (err) res.status(200).send({ error: 'user couldnt be logged out' })
            else res.status(200).send({ success: 'user was logged out'})
        })
    } catch {
        res.status(200).send({ error: 'user couldnt be logged out' })
    }
}