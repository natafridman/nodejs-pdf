import mongoose from 'mongoose'
import config from './config'

(async () => {
    try {
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, 
        {
            //user: config.MONGO_USER,
            //pass: config.MONGO_PASSWORD
        })
        console.log('database ' + db.connection.name + ' is connected')
    } catch (error) {
        console.log(error)
    }
})()

