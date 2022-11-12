import passport from 'passport'
import '../providers/auth.js'
import { login, authUser, logout, create } from '../controllers/auth.controller.js'
import { checkAuth } from '../middleware/auth.middleware.js'

const auth = (express, router) => {
    router.post(
        '/login', 
        passport.authenticate('local'),
        login
    )
    router.post(
        '/auth',
        checkAuth,
        authUser
    )
    router.post(
        '/logout', 
        checkAuth, 
        logout
    )
    router.post(
        '/create', 
        create
    )
}

export default auth