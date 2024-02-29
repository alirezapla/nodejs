import { PhoneBook, } from '../Models/db.model'
import { logger } from "../Utils/logger"
import { ServiceEvents } from "../Utils/events"
import NotFoundError from '../Exceptions/NotFound'




export class dbPhoneBookService {
    async createEntry(data: any) {
        logger.info("", { event: ServiceEvents.CREATE_ENTRY_SERVICE_STARTED })
        const phoneBook = await PhoneBook.create(data)
        logger.info(JSON.stringify(phoneBook), { event: ServiceEvents.CREATE_ENTRY_SERVICE_FINISHED })
        return phoneBook

    }

    async getEntries() {
        logger.info("", { event: ServiceEvents.GET_ENTRIES_SERVICE_STARTED })
        const entries = await PhoneBook.find({}, { projection: { _id: 0 } })
        logger.info(JSON.stringify(entries), { event: ServiceEvents.GET_ENTRIES_SERVICE_FINISHED })
        return entries
    }

    async getEntryByLable(label: string) {
        logger.info("", { event: ServiceEvents.GET_ENTRY_BY_LABEL_SERVICE_STARTED })

        var suggestions = await PhoneBook.findOne({ label: label })
        if (!suggestions) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }

        logger.info(JSON.stringify(suggestions), { event: ServiceEvents.GET_ENTRY_BY_LABEL_SERVICE_FINISHED })
        return suggestions

    }
    async getEntryByName(name: string) {
        logger.info("", { event: ServiceEvents.GET_ENTRY_BY_NAME_SERVICE_STARTED })

        var entry = await PhoneBook.findOne({ name: name })
        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }
        logger.info(JSON.stringify(entry), { event: ServiceEvents.GET_ENTRY_BY_NAME_SERVICE_FINISHED })

        return entry

    }

    async updateEntry(name: string, data: any) {
        logger.info(`name is ${name}`, { event: ServiceEvents.UPDATE_ENTRY_SERVICE_STARTED })

        var entry = await PhoneBook.findOneAndUpdate({ name: name }, data, { new: true })

        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }

        logger.info(JSON.stringify(entry), { event: ServiceEvents.UPDATE_ENTRY_SERVICE_FINISHED })
        return entry

    }

    async deletePost(name: string) {
        logger.info(`name is ${name}`, { event: ServiceEvents.DELETE_ENTRY_SERVICE_STARTED })

        const entry = await PhoneBook.findOneAndDelete({ name: name })
        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }
        logger.info("", { event: ServiceEvents.DELETE_ENTRY_SERVICE_FINISHED })
        return "Entry deleted"

    }
}

export const dbPhoneBookServices = new dbPhoneBookService()