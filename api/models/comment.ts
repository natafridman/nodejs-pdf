import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Login',
    },
    from_post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Comment', commentSchema)