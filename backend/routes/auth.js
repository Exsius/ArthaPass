import { login, logout, refreshToken } from '../controllers/auth_controller.js'
import { checkAuth } from '../middleware/auth_middleware.js'
import auth_config from '../configs/passport-config.js'
import passport from 'passport'

const auth = (express, router) => {
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/api/auth',
        failureFlash: true
    }), login)

    router.post('/refreshtoken', checkAuth, refreshToken)

    router.get('/auth', checkAuth, login)
    
    router.post('/logout', checkAuth, logout)
}

export default auth