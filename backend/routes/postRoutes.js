import express from 'express'
import { createPost, deletePost, getAllPost, getPostById, updatePost } from '../controller/postControllers.js'
import { authenticate, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authenticate, authorize, createPost)
router.get('/', getAllPost)
router.get('/:id', getPostById)
router.put('/:id', authenticate, authorize, updatePost)
router.delete('/:id', authenticate, authorize, deletePost)

export default router