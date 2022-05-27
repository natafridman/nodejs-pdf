import {RequestHandler} from 'express'
import Post from '../models/post'

// Crear un nuevo post
export const createPost : RequestHandler = async (req, res) => {
    try {
        const { created_by, description } = req.body

        const newPost = await Post.create({
            created_by, 
            description
        })

        if(!newPost) return res.status(400).json({message: 'Error creating post'})

        return res.json({message: 'Post created successfully'})
    } catch (error) {
        res.json(error)
    }
}

// Obtener todos los posts
export const getAllPosts : RequestHandler = async (req, res) => {
    try {
        const { withComments } = req.query

        if(withComments) {
            const response = await Post.find().populate('comments').exec()
            return res.json(response)
        }
        else
            return res.json(await Post.find())
    } catch (error) {
        res.json(error)
    }
}

// Obtener todos los posts
export const likePost : RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findByIdAndUpdate(id, { $inc: {'likes': 1 } }, {new: true })

        if(!post) return res.status(404).json({message: 'Post not found'})

        return res.json({message: 'liked'})
    } catch (error) {
        res.json(error)
    }
}