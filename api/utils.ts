import jwt from 'jsonwebtoken'
import config from './config'

export const signToken = (username: string, userID: string) => jwt.sign(
    {
        username,
        userID,
    },
    config.TOKEN_KEY, { expiresIn: "1h" }
)

export const isEmail = (mail : string) => {
    return mail.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
}