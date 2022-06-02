import {Schema, model} from 'mongoose'
import { isEmail } from '../utils'

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: (e:string) => isEmail(e)
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true
    },
    role: {
        type: String,
        trim: true,
        default: 'user'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
})

export default model('Login', loginSchema)