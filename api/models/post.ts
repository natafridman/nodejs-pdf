import {Schema, model} from 'mongoose'

const postSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Login',
    },
    description: {
        type: String,
        trim: true
    },
    likes: {
        type: Number,
        trim: true,
        default: 0
    },
    comments: ['Comment']
}, {
    versionKey: false,
    timestamps: true
})

export default model('Post', postSchema)