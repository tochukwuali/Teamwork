import CommentController from '../controllers/CommentController'
import { Router } from 'express'

const router = Router()

router.get('/', CommentController.getAllComments)
router.post('/', CommentController.createComment)

export default router