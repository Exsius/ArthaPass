export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.sendStatus(401)
}

export const checkNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.sendStatus(401)
    }
    return next()
}