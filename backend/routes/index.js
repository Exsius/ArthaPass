import express from 'express'
const router = express.Router()

import authRoute from './auth.js'
import calenderRoute from './calender.js'

export const auth = authRoute(express, router)
export const calender = calenderRoute(express, router)

export default router