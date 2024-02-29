import express from "express";
import { Request, Response, NextFunction } from 'express'
import { PhoneBookController } from './Controllers/controller'
import { logger } from "./Utils/logger";
import { ServiceEvents } from "./Utils/events";

export const router = express.Router()
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const x = res.getHeaders()
    logger.info(`${JSON.stringify(x)}`, { event: ServiceEvents.LAST_MIDDLEWARE_RECIVED })
    next();
};


router.post("/", PhoneBookController.addEntry);

router.get("/", PhoneBookController.getEntries);

router.get("/label/:label", PhoneBookController.getEntriesByLable);

router.get("/entry/:name", PhoneBookController.getEntryByName);

router.put("/entry/:name", PhoneBookController.updateEntry);

router.delete("/entry/:name", PhoneBookController.deleteEntry);

router.use(myMiddleware);