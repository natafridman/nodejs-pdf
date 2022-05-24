import { NextFunction, Request, Response, Router } from "express"
import * as loginController from '../controllers/login.controller'

const router = Router()

function getMiddleware(req:Request, res:Response, next:NextFunction) {
    console.log(req.body)
    res.setHeader("token", "7kuj6yh5gt4rfewaste")
    next()
}

router.get('/api/login/existUser', loginController.existsUser)
router.post('/api/login/createUser', loginController.createUser)
router.get('/api/login/getAllUsers', loginController.getAllUsers)
router.post('/api/login', loginController.login)

export default router