import { createPassword, deletePassword, editPassword, getPassword, getPasswordList, scanPassword } from '../controllers/password_controller.js'
import { checkAuth } from '../middleware/auth_middleware.js'

const password = (express, router) => {

    router.get('/password/get/:id', checkAuth, getPassword)

    router.get('/password/getlist', checkAuth, getPasswordList)

    router.post('/password/edit/:id', checkAuth, editPassword)

    router.post('/password/create', checkAuth, createPassword)

    router.post('/password/delete/:id', checkAuth, deletePassword)

    router.get('/password/scan/:id', checkAuth, scanPassword)

}

export default password