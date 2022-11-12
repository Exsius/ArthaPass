import { User } from '../models/index.js'

export const login = (req, res) => {
    res.status(200).send({ user_id: req.user.id })
}

export const authUser = (req, res) => {
    res.status(200).send({ user_id: req.user.id })
}

export const logout = async (req, res) => {
    req.logout(function(err) {
        if (err) { res.send(err).sendStatus(401) }
        res.sendStatus(200)
      })
}

export const invite = async (req, res) => {
    try {
        await User.create({
            username: req.body.username
        })
        res.sendStatus(201)
    } catch {
        res.sendStatus(400)
    }
}

export const activate = async (req, res) => {
    try {
        await User.update({ password: req.body.password }, {
            where: {
                id: req.user.id
            }
        })
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    }
}

import bcrypt from 'bcrypt'
export const create = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
        username: req.body.username,
        password: hashedPassword,
        authority: req.body.authority
    })
    res.send('done')
}