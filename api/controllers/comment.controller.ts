import {RequestHandler} from 'express'
import Comment from '../models/comment'
import Post from '../models/post'
import GeneradorPDF from '../pdf_generator/pdf_generator'

// Crear un nuevo post
export const createComment : RequestHandler = async (req, res) => {

    const new_pdf = GeneradorPDF();
    return res.json({message: new_pdf});

    try {
        const { created_by, description } = req.body
        const { idPost } = req.params

        const existingPost = await Post.findById(idPost)     
        
        const newComment = await Comment.create({
            created_by, 
            description,
            from_post: existingPost._id
        })

        if(!newComment) return res.status(400).json({message: 'Error creating comment'})

        return res.json({message: 'Comment created successfully'})
    } catch (error) {
        res.json(error)
    }
}

// Obtener todos los posts
export const getAllComments : RequestHandler = async (req, res) => {
    try {
        return res.json(await Comment.find())
    } catch (error) {
        res.json(error)
    }
}