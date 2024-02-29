import express from "express";
import session from "express-session";
import bodyParser from 'body-parser';
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";
import dotenv from 'dotenv'
import { errorHandler } from "./Middlewares/errors";
require('dotenv').config();
import "express-async-errors";
import { logger } from "./Utils/logger";
import { ServiceEvents } from "./Utils/events";
import { dbConnect } from './Config/db'

dotenv.config()
const dbMode = process.env.DB_MODE
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'arbitary-string',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);
app.use(function (req, res, next) {
    logger.info(`to endpoint: ${req.path} from ${req.ip}`, { event: ServiceEvents.INCOMMING_MIDDLEWARE_RECIVED })
    next();
});
app.use('/phonebooks', router);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (dbMode === "true") {
    dbConnect().then(() => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
    })

} else {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
}


export default app