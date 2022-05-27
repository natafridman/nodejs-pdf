import { NextFunction, Request, Response, Router } from "express"
import * as commentController from '../controllers/comment.controller'
import { authorization, authorizationRole } from "../middlewares/auth"

const router = Router()

router.post('/api/comment/createComment/:idPost', authorization, commentController.createComment)
router.get('/api/comment/getAllComments', authorization, commentController.getAllComments)

export default router