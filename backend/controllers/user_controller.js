import { Op } from 'sequelize'
import { user, password } from '../models/index.js'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import fs from 'fs'
import axios from 'axios'

export const updateUserInfo = async (req, res) => {
    const { fname, lname, apikey } = req.body
    try {
        const myUser = await user.findOne({ where: { id: req.user.id } })
        await myUser.update({
            fname: fname,
            lname: lname,
            apikey: apikey,
        })
        res.send({ success: 'user information updated' })
    } catch {
        res.send({ error: 'user information could not be updated' })
    }
}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const myUser = await user.findOne({ where: { id: req.user.id } })
    try {
        bcrypt.compare(oldPassword, myUser.password, (err, match) => {
            if (err) res.send({ error: err })
            if (match) {
                if (oldPassword === newPassword) {
                    res.send({ error: 'new Password can not be the same as old password' })
                } else {
                    const hashedPassword = bcrypt.hash(newPassword, 10, (err, hash) => {
                        user.update({ password: hash }, { where: { id: req.user.id } }).then(result => {
                            res.status(201).send({ success: 'password was changed' })
                        })
                    })
                }
            } else {
                res.send({ error: 'current password is invalid' })
            }
        })
    } catch {
        res.send({ error: 'could not change password' })
    }
}

export const updateProfilePic = async (req, res) => {
    const { id } = req.user
    try {
        const currentPath = new URL('../public/uploads/', import.meta.url).pathname
        const newPath = new URL(`../public/uploads/users/${req.user.id}/profile/`, import.meta.url).pathname
        if (!fs.existsSync(newPath)){
            fs.mkdirSync(newPath, { recursive: true})
        } else {
            fs.rmdirSync(newPath, { recursive: true})
            fs.mkdirSync(newPath, { recursive: true})
        }
        fs.renameSync(`${currentPath}${req.file.filename}`, `${newPath}${req.file.filename}`)
        user.update({ pfpDir: `/uploads/users/${req.user.id}/profile/${req.file.filename}` }, { where: { id: id } })
        res.send({ sucess: 'Profile picture was updated' })
    } catch (err) {
        console.log(err)
        res.send({ error: 'error' })
    }
}

export const scanExposure = async (req, res) => {
    try {
        const myUser = await user.findOne({ where: { id: req.user.id } })
        const myPasswords = await password.findAll({ where: { user_id: req.user.id } })
        const exposures = await Promise.all(myPasswords.map( async (pw) => {
            const result = await axios.get(`https://api.enzoic.com/exposures?username=${pw.username}`, {
                headers: {
                    Accept: 'application/json', 'Accept-Encoding': 'identity',
                    authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
                }
            })
            return result.data.count
        }))
        res.status(200).send(exposures)
    } catch (err) {
        console.log(err)
        res.status(401).send('can not get exposed accounts')
    }
}

const userinfo = (req, res) => {
    user.findOne({ where: { id: req.user.id } }).then((myUser) => {
        res.status(200).send({
            fname: myUser.fname,
            lname: myUser.lname, 
            email: myUser.email, 
            apikey: myUser.apikey,
            pfp: myUser.pfpDir,
        })
    }).catch((err) => {
        res.status(401).send({ error: 'unauthorized' })
    })
}

export default userinfo