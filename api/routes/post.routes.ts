import { NextFunction, Request, Response, Router } from "express"
import * as postController from '../controllers/post.controller'
import { authorization, authorizationRole } from "../middlewares/auth"

const router = Router()

router.post('/api/post/createPost', authorization, postController.createPost)
router.get('/api/post/getAllPosts', authorization, postController.getAllPosts)
router.put('/api/post/likePost/:id', authorization, postController.likePost)

export default router