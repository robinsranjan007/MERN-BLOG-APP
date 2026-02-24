import express from 'express'
import { createCommnet, deleteComment, getCommentsByPost } from '../controller/commentController.js'
import { authenticate, authorized } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/:postId', authenticate, createCommnet)
router.get('/:postId', getCommentsByPost)
router.delete('/:id', authenticate, authorized, deleteComment)

export default router