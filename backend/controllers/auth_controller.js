import { user } from '../models/index.js'

export const login = (req, res) => {
    res.status(200).send({ user_id: req.user.id })
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