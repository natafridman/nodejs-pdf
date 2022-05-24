import {Schema, model} from 'mongoose'

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Login', loginSchema)