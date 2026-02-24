import express from 'express'
import { loginUser, registerUser } from '../controller/authControllers.js'

const router = express.Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout', authenticate, logout)


export default router

