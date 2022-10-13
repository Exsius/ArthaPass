import express from 'express'
const router = express.Router()

import authRoute from './auth.js'

export const auth = authRoute(express, router)

export default router