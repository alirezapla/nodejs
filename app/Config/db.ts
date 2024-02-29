import dotenv from 'dotenv'
import mongoose, { Mongoose } from 'mongoose'
import { logger } from "../Utils/logger"
import { ServiceEvents } from "../Utils/events"

dotenv.config()

const USERNAME = process.env.DB_USER
const PASSWD = process.env.DB_PASSWORD
const DB = process.env.DB_NAME
const HOST = process.env.DB_HOST

export async function dbConnect() {
    const connectionString = `mongodb://${USERNAME}:${PASSWD}@${DB}:27017/${HOST}?authSource=admin`

    const options = {
        autoIndex: false,
        maxPoolSize: 100,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000, //ms(4.5 seconds)
        family: 4
    };
    try {
        const res = await mongoose.connect(connectionString, options)
        if (res) {
            logger.info(`succeffully connected to ${DB}`, { event: ServiceEvents.CONNECTED_TO_DB })
        }
    } catch (err) {
        logger.info(JSON.stringify(err), { event: ServiceEvents.COULD_NOT_CONNECT_TO_DB })
    }
}


// export const db = mongoose.connect(connectionString, options)
//     .then(res => {
//         if (res) {
//             logger.info(`succeffully connected to ${dbName}`, { event: ServiceEvents.CONNECTED_TO_DB })
//         }

//     }).catch(err => {
//         logger.info(err, { event: ServiceEvents.COULD_NOT_CONNECT_TO_DB })

//     })
