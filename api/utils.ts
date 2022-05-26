import jwt from 'jsonwebtoken'
import config from './config'

export const signToken = (username: string, userID: string) => jwt.sign(
    {
        username,
        userID,
    },
    config.TOKEN_KEY, { expiresIn: "1h" }
)
