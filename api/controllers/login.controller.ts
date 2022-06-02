import {RequestHandler} from 'express'
import Login from '../models/login'
import bcrypt from 'bcryptjs'
import { signToken } from '../utils'

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
        const { username, name, surname } = req.body
        const usuarioExistente = await Login.findOne({
            username
        })

        if(usuarioExistente) 
            return res.status(400).json({message: 'The user could not be created because already exist'})

        // Encriptar contraseña
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        const nuevoUsuario = await Login.create({
            username,
            password: encryptedPassword,
            name,
            surname
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

// Eliminar usuario
export const deleteUser : RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const userDeleted = await Login.findByIdAndDelete({ _id: id })
        
        console.log(userDeleted)

        return res.json({message: 'User deleted successfully'})
    } catch (error:any) {
        if(error.name === 'CastError') return res.json({message: 'The user could not be deleted because it could not be found'})

        res.json(error)
    }
}