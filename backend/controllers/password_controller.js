import { password as Password, user } from '../models/index.js'
import axios from 'axios'
import bcrypt from 'bcryptjs'

export const getPassword = async (req, res) => {
    const { id } = req.params
    try {
        const myPassword = await Password.findOne({ where: { id: id } })
        res.status(200).send(myPassword)
    } catch {
        res.status(401).send('can not get password')
    }
}

export const getPasswordList = async (req, res) => {
    try {
        const myPasswords = await Password.findAll({ where: { user_id: req.user.id } })
        res.status(200).send(myPasswords)
    } catch {
        res.status(401).send('can not get passwords')
    }
}

export const editPassword = async (req, res) => {
    const { id } = req.params
    const { username, password } = req.body
    // owasp password strength regex
    const strongStrength = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\"\'()+,-.\/:;<=>?[\\]^_`{|}~])(?=.{10,})')
    const mediumStrength = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\"\'()+,-.\/:;<=>?[\\]^_`{|}~])(?=.{8,})')
    try {
        const hashedPassword = await bcrypt.hash(password, 10, async (err, hash) => {
            await Password.update({
                username: username,
                password: password,
                strength: password.test(strongStrength) ? password.exec(strongStrength).length / password.length : password.test(mediumStrength) ? password.exec(mediumStrength).length / password.length : password.length / 100,
            }, { 
                where: { id: id }
            })
            res.status(200).send('password updated')
        })
    } catch {
        res.status(401).send('can not edit password')
    }
}

export const createPassword = async (req, res) => {
    const { site, username, password } = req.body
    
    const strongStrength = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\"\'()+,-.\/:;<=>?[\\]^_`{|}~])(?=.{10,})')
    const mediumStrength = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\"\'()+,-.\/:;<=>?[\\]^_`{|}~])(?=.{8,})')
    const defaultStrength = password.length / 100

    try {
        const hashedPassword = await bcrypt.hash(password, 10, async (err, hash) => {
            await Password.create({
                user_id: req.user.id,
                site: site,
                username: username,
                password: hash,
                strength: strongStrength.test(password) ? 0.75 + defaultStrength : mediumStrength.test(password) ? 0.5 + defaultStrength : defaultStrength,
                history: [
                    {
                        date: new Date(),
                        action: 'added to password bank'
                    },
                ]
            })
            // scanNewPassword(username, password)
            res.status(200).send('password added')
        })    
    } catch (err) {
        console.log(err)
        res.status(401).send('can not create password')
    }
    //console.log(strongStrength.test(password) ? strongStrength.exec(password)['input'].length / password.length : mediumStrength.test(password) ? password.exec(mediumStrength)['input'].length / password.length : password.length / 100)
}

export const scanNewPassword = async (username, password) => {
    try {
        const myUser = await user.findOne({ where: { id: req.user.id } })
        // const result = await axios.post(`https://api.enzoic.com/passwords`, {
        //     partialSHA256: '\x38\x63\x34\x35\x34\x35\x33\x36\x62\x36\x65\x32\x62\x38\x62\x32\x39\x61\x31\x64\x38\x33\x39\x61\x61\x33\x63\x35\x63\x63\x66\x30\x61\x62\x35\x37\x61\x35\x39\x30\x64\x36\x31\x39\x37\x33\x39\x62\x32\x33\x61\x33\x32\x64\x31\x31\x35\x38\x35\x32\x32\x30\x63\x39'
        // },
        // {
        //     headers: {
        //         Accept: 'application/json', 'Accept-Encoding': 'identity',
        //         authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
        //     },
        // })
        const enzoic_api_result = await axios.get(`https://api.enzoic.com/accounts?username=${myUser.email}`,
        {
            headers: {
                Accept: 'application/json', 'Accept-Encoding': 'identity',
                authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
            },
        })

        let generatedPasswords = []

        enzoic_api_result.passwordHashesRequired.forEach(async (pw) => {
            if (pw.hashType === 8) {
                const hashedPassword = await bcrypt.hash(password, pw.salt, async (err, hash) => {
                    generatedPasswords.push(hash)
                })
            }
        })

        generatedPasswords.forEach((pw) => {
            const toHash = username + '$' + pw
            Argon2(toHash, accountSalt)
        })
        
    } catch (err) {
        console.log(err)
    }
}

export const scanHashPassword = async (req, res) => {
    const { id } = req.params
    try {
        const myUser = await user.findOne({ where: { id: req.user.id } })
        const myPassword = await Password.findOne({ where: { user_id: req.user.id, id: id } }).then(result => {

        })
        // const result = await axios.post(`https://api.enzoic.com/passwords`, {
        //     partialSHA256: '\x38\x63\x34\x35\x34\x35\x33\x36\x62\x36\x65\x32\x62\x38\x62\x32\x39\x61\x31\x64\x38\x33\x39\x61\x61\x33\x63\x35\x63\x63\x66\x30\x61\x62\x35\x37\x61\x35\x39\x30\x64\x36\x31\x39\x37\x33\x39\x62\x32\x33\x61\x33\x32\x64\x31\x31\x35\x38\x35\x32\x32\x30\x63\x39'
        // },
        // {
        //     headers: {
        //         Accept: 'application/json', 'Accept-Encoding': 'identity',
        //         authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
        //     },
        // })

        const enzoic_api_result = await axios.get('https://api.enzoic.com/accounts?username=' + encodeURI(uname),
        {
            headers: {
                Accept: 'application/json', 'Accept-Encoding': 'identity',
                authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
            },
        })

        let generatedPasswords = []

        // enzoic_api_result.passwordHashesRequired.forEach(async (pw) => {
        //     if (pw.hashType === 8) {
        //         const hashedPassword = await bcrypt.hash(password, pw.salt, async (err, hash) => {
        //             generatedPasswords.push(hash)
        //         })
        //     }
        // })

        enzoic_api_result.data.passwordHashesRequired.forEach((pw) => {
            if (pw.hashType === 8) {
                const toHash = myUser.username + '$' + pw
                const argon2Hash = Argon2(toHash, pw.salt)
                generatedPasswords.push(argon2Hash.substring(argon2Hash.lastIndexOf('$') + 1))
            }
        })

        const custom_query_array = generatedPasswords.map((pw, index) => (
            `partialHashes=${pw}`
        ))

        const enzoic_api_cred_result = await axios.get(`https://api.enzoic.com/credentials?${custom_query_array.join('&')}`,
        {
            headers: {
                Accept: 'application/json', 'Accept-Encoding': 'identity',
                authorization: `basic ${Buffer.from(myUser.apikey + ':hAMZTqWN8hBn1+6JzGXg!6EaJEkFz!nT').toString('base64')}`
            },
        })

        // console.log(result.data)
        // await myUser.update({ history: [...myUser.history, {
        //     date: Date.now(),
        //     action: 'scanned account',
        //     result: 'safe'
        // }] })
        // console.log(enzoic_api_cred_result.body)
        // res.status(200).send(enzoic_api_cred_result.data)
        res.status(200).send('scanned password')
    } catch (err) {
        console.log(err)
        res.status(401).send('can not get exposed account')
    }
}

export const scanPassword = async (req, res) => {
    const { id } = req.params
    try {
        const myPassword = await Password.findOne({ where: { user_id: req.user.id, id: id } })
        await myPassword.update({ history: [{
            date: Date.now(),
            action: 'scanned account',
            result: 'safe'
        }, eval(...myPassword.history)] })
        res.send(200).send('scanned password')
    } catch (err) {
        console.log(err)
        res.status(400).send('err')
    }
}

export const deletePassword = async (req, res) => {
    const { id } = req.params
    try {
        await Password.destroy({ where: { id: id } })
        res.status(200).send('password deleted')
    } catch {
        res.status(401).send('can not delete password')
    }
}