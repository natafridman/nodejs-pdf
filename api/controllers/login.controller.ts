import {RequestHandler} from 'express'
import Login from '../models/login'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Reviso si dado un username y password existe el usuario en la base o no
export const existsUser : RequestHandler = async (req, res) => {
    try {
        const usuarioExistente = await Login.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if(!usuarioExistente) 
            return res.status(404).json({message: 'The user does not exist'})
        
        return res.json(usuarioExistente)
    } catch (error) {
        res.json(error)
    }
}

// Reviso si dado un username y password existe el usuario en la base o no
export const login : RequestHandler = async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username || !password)
            return res.status(422).json({message:"Missing Input params"})

        const usuarioExistente = await Login.findOne({
            username
        })

        if(!usuarioExistente) return res.status(404).json({message: 'The user does not exist'})

        await bcrypt.compare(password, usuarioExistente.password, (err, suc) => {
            if(suc)
            {
                const newToken = jwt.sign({
                    username,
                    userID: usuarioExistente._id
                }, 'primerProyectoToken_eqdweuinqd3pj2903d2!$%SD', {expiresIn: "30s"})

                return res.json({token: newToken})
            }
        })
        
        return res.status(401);
    } catch (error) {
        res.json(error)
    }
}

// Reviso si dado un username y password existe el usuario en la base o no
export const getAllUsers : RequestHandler = async (req, res) => {
    try {
        return res.json(await Login.find())
    } catch (error) {
        res.json(error)
    }
}

// Request que sirve para crear un nuevo usuario (solo utilizado internamente)
export const createUser : RequestHandler = async (req, res) => {
    try {
        const username = req.body.username
        const usuarioExistente = await Login.findOne({
            username
        })

        if(usuarioExistente) 
            return res.status(400).json({message: 'The user could not be created because already exist'})

        // Encriptar contraseña
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        const nuevoUsuario = await Login.create({
            username,
            password: encryptedPassword
        });

        if(!nuevoUsuario)
            return res.status(404).json({message: 'The user could not be created'})
        
        const newToken = jwt.sign({
            username,
            userID: nuevoUsuario._id
        }, 'primerProyectoToken_eqdweuinqd3pj2903d2!$%SD', {expiresIn: "30s"})
        
        console.log(nuevoUsuario, newToken);
        
        return res.status(200).json({...nuevoUsuario._doc, token: newToken})
    } catch (error) {
        res.json(error)
    }
}