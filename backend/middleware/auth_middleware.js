import { user } from '../models/index.js'

export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(200).send({ error: req.flash('error') })
}