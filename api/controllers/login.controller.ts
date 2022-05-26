import {RequestHandler} from 'express'
import Login from '../models/login'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'
import { signToken } from '../utils'

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
        }).select('+password')

        if(!usuarioExistente) return res.status(404).json({message: 'The user does not exist'})

        if(await bcrypt.compare(password, usuarioExistente.password)) {
            const newToken = signToken(username, usuarioExistente._id);

            return res.json({token: newToken})
        } else {
            return res.status(401).json({message: 'Invalid password'})
        }
    } catch (error) {
        res.json(error)
    }
}

// Reviso si dado un username y password existe el usuario en la base o no
export const getAllUsers : RequestHandler = async (req, res) => {
    try {
        console.log(res.locals)
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
        
        const newToken = signToken(username, usuarioExistente._id);
        
        console.log(nuevoUsuario, newToken);
        
        return res.status(200).json({...nuevoUsuario._doc, token: newToken})
    } catch (error) {
        res.json(error)
    }
}

// Buscar usuario y modificarlo
export const updateUser : RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Login.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
}