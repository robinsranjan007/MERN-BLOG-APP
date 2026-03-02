import express from 'express'
import { getMe, loginUser, registerUser } from '../controller/authControllers.js'

const router = express.Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout', authenticate, logout)
router.get('/me',authenticate,getMe)

export default router

