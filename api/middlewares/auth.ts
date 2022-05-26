import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import Login from '../models/login'

export const authorization = (req:Request, res:Response, next:NextFunction) => {
    const token = req.body.token || req.query.token || req.headers.authorization

    // 403: Forbbiden
    if(!token) return res.status(403).json({message: 'token required'})

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)

        res.locals.token = decoded

        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'})
    }
}

export const authorizationRole = (role:string) => async (req:Request, res:Response, next:NextFunction) => {
    console.log(role);
    
    const token = req.body.token || req.query.token || req.headers.authorization

    // 403: Forbbiden
    if(!token) return res.status(403).json({message: 'token required'})

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY) as JwtPayload

        res.locals.token = decoded

        const user = await Login.findById(decoded.userID)

        // 401: Unauthorized
        if(user.role === role) next(); else return res.status(401).json({message: 'Role not Authorized'}) 
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'})
    }
}