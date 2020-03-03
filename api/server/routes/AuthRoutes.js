import UserController from '../controllers/UserController'
import { Router } from 'express'

const router = Router()

router.post('/', UserController.login)

export default router