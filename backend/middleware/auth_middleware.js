import { user } from '../models/index.js'
import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        //session authentication
        return next()
    } else if (req.headers['authorization']) {
        //jwt authentication
        jwt.verify(req.headers['authorization'].split(' ')[1], process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403).send({ error: req.flash('error') })
            req.user = user
            next()
        })
    }
    res.status(403).send({ error: req.flash('error') })
}