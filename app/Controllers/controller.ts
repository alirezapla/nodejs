import { dbPhoneBookServices } from '../Services/db.service'
import { inMemoryPhoneBookServices } from '../Services/inMemory.service'
import { Request, Response, NextFunction } from 'express'
import { CreatePhoneBookschemaValidate, UpdatePhoneBookschemaValidate } from '../Models/inMemory.model'
import BadRequestError from '../Exceptions/BadRequest'
import dotenv from 'dotenv'

dotenv.config()
const phoneBookServices = process.env.DB_MODE === "true" ? dbPhoneBookServices : inMemoryPhoneBookServices

class phoneBookController {

    addEntry = async (req: Request, res: Response, next: NextFunction) => {
        const data = { name: req.body.name, value: req.body.value, label: req.body.label }

        const { error, value } = CreatePhoneBookschemaValidate.validate(data)
        if (error) {
            try {
                throw new BadRequestError({ code: 400, message: error.message });
            } catch (error) {
                next(error);
            }
        } else {
            const entry = await phoneBookServices.createEntry(value)
            res.status(201).json({ message: 'Created', data: entry });
        }
        next()
    }

    getEntries = async (req: Request, res: Response, next: NextFunction) => {
        const entries = await phoneBookServices.getEntries()
        res.status(200).json({ message: "Retrived", data: entries })
        next()

    }

    getEntriesByLable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entry = await phoneBookServices.getEntryByLable(req.params.label)
            res.status(200).json({ message: "Retrived", data: entry })
            next()
        } catch (error) {
            next(error);
        }

    }
    getEntryByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entry = await phoneBookServices.getEntryByName(req.params.name)
            res.status(200).json({ message: "Retrived", data: entry })
            next()
        } catch (error) {
            next(error);
        }


    }

    updateEntry = async (req: Request, res: Response, next: NextFunction) => {
        const data = { value: req.body.value, label: req.body.label }

        const { error, value } = UpdatePhoneBookschemaValidate.validate(data)
        if (error) {
            try {
                throw new BadRequestError({ code: 400, message: error.message });
            } catch (error) {
                next(error);
            }
        } else {
            try {
                const entry = await phoneBookServices.updateEntry(req.params.name, value)
                res.status(200).json({ message: "Updated", data: entry })
            } catch (error) {
                next(error)
            }
        }
        next()

    }



    deleteEntry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _res = await phoneBookServices.deletePost(req.params.name)
            res.status(204).json({ message: _res })
            next()
        } catch (error) {
            next(error)
        }

    }
}

export const PhoneBookController = new phoneBookController()