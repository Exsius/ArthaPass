import { user } from '../models/index.js'
import bcrypt from 'bcryptjs'
import isEmail from 'validator/lib/isEmail.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    const { token } = req.params
    if (req.body.password && isEmail(req.body.email)) {
        const result = await user.findOne({ where: { email: req.body.email }}).catch((err) => {
            res.status(400).send({ error: "bad Request" })
        })
        if (!result) {
            const hashedPassword = bcrypt.hash(req.body.password, 10, (err, hash) => {
                user.create({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    verified: true,
                    password: hash
                }).then(result => {
                    res.status(201).send({ success: 'user created' })
                })
            })
        } else {
            if (result.verified === false) {
                const hashedPassword = bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    await result.update({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        verified: true,
                        password: hash
                    })
                    return res.status(202).send({ success: 'user created' })
                })
            } else {
                res.status(409).send({ error: "user already exists." })
            }
        }
    } else {
        res.status(400).send({ error: "bad Request" })
    }
}

export default register