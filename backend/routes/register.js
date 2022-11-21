import reg from '../controllers/register_controller.js'

const register = (express, router) => {
    router.post('/register/:token', reg)

    router.post('/register', reg)
}

export default register