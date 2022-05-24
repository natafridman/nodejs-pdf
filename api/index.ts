import express from 'express'
import config from './config'
import morgan from 'morgan'
import cors from 'cors'
import loginRoutes from './routes/login.routes'
import dotenv from 'dotenv'
import './database'

require('dotenv').config()

const app = express()

app.set('port', process.env.PORT || config.PORT)

app.use(morgan('dev'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(loginRoutes)

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'))
})

export default app;