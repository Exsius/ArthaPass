import express from 'express'
const router = express.Router()

import authRoute from './auth.js'
import registerRoute from './register.js'
import dashboardRoute from './auth.js'
import userRoute from './user.js'
import passwordRoute from './password.js'

export const auth = authRoute(express, router)
export const register = registerRoute(express, router)
export const user = userRoute(express, router)
export const dashboard = dashboardRoute(express, router)
export const password = passwordRoute(express, router)

export default router