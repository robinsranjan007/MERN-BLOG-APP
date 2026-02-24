import express from 'express'
import { authenticate, authorized } from '../middleware/authMiddleware.js'
import { createCategory, deleteCategory, getAllCategory } from '../controller/categoryController.js'

const router = express.Router()


router.get('/',getAllCategory,authenticate,authorized)
router.post('/',createCategory,authenticate,authorized)
router.delete('/:id',deleteCategory,authenticate,authorized)

export default router