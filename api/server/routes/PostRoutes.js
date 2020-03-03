 import { Router } from 'express'
 import PostController from '../controllers/PostController'

 const router = Router()

 router.get('/', PostController.getAllPosts)
 router.get('/:id', PostController.getAPost)
 router.post('/',PostController.addPost)
 router.put('/:id', PostController.updatePost)
 router.delete('/:id', PostController.deletePost)

 export default router