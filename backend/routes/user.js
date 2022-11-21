import userInfo, { updateUserInfo, changePassword, updateProfilePic } from '../controllers/user_controller.js'
import { checkAuth } from '../middleware/auth_middleware.js'
import multer from 'multer'
import { storage } from '../configs/multer-config.js'
const upload = multer({ storage: storage })

const user = (express, router) => {
    router.get('/user', checkAuth, userInfo)

    router.post('/user/updateInfo', checkAuth, updateUserInfo)

    router.post('/user/changePassword', checkAuth, changePassword)

    router.post('/user/updateProfilePic', checkAuth, upload.single('profilePic'), updateProfilePic)

}

export default user