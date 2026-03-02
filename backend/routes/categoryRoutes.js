import express from 'express'
import { authenticate, authorized } from '../middleware/authMiddleware.js'
import { createCategory, deleteCategory, getAllCategory } from '../controller/categoryController.js'

const router = express.Router()


router.get('/', getAllCategory)  // public, no middleware needed
router.post('/', authenticate, authorized, createCategory)  // middleware first, then controller
router.delete('/:id', authenticate, authorized, deleteCategory)

export default router 