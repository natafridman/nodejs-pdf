import { NextFunction, Request, Response, Router } from "express"
import * as loginController from '../controllers/login.controller'
import { authorization, authorizationRole } from "../middlewares/auth"

const router = Router()

function getMiddleware(req:Request, res:Response, next:NextFunction) {
    console.log(req.body)
    res.setHeader("token", "7kuj6yh5gt4rfewaste")
    next()
}

router.post('/api/login/createUser', loginController.createUser)
router.get('/api/login/getAllUsers', authorizationRole('user'), loginController.getAllUsers)
router.post('/api/login', loginController.login)
router.put('/api/login/updateUser/:id', authorization, loginController.updateUser)
router.delete('/api/login/deleteUser/:id', authorization, loginController.deleteUser)

export default router