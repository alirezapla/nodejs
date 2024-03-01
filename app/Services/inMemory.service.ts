import { PhoneBook, } from '../Models/inMemory.model'
import { logger } from "../Utils/logger"
import { ServiceEvents } from "../Utils/events"
import NotFoundError from '../Exceptions/NotFound'
import BadRequestError from '../Exceptions/BadRequest'

const phoenBookMap = new Map();



export class inMemoryPhoneBookService {
    async createEntry(data: any) {
        logger.info("", { event: ServiceEvents.CREATE_ENTRY_SERVICE_STARTED })
        if (phoenBookMap.get(data.name)) {
            return new BadRequestError({ code: 400, message: "Entry Already Exist" })
        }
        const phoneBook: PhoneBook = {
            value: data.value,
            label: data.label,
            createdDate: new Date(),
            updatedDate: new Date()
        }
        phoenBookMap.set(data.name, phoneBook)
        logger.info(JSON.stringify(phoneBook), { event: ServiceEvents.CREATE_ENTRY_SERVICE_FINISHED })
        return phoneBook

    }

    async getEntries() {
        logger.info("", { event: ServiceEvents.GET_ENTRIES_SERVICE_STARTED })
        const entries = Array.from(phoenBookMap.values())
        logger.info(JSON.stringify(entries), { event: ServiceEvents.GET_ENTRIES_SERVICE_FINISHED })
        return entries
    }

    async getEntryByLable(label: string) {
        logger.info("", { event: ServiceEvents.GET_ENTRY_BY_LABEL_SERVICE_STARTED })

        var suggestions = Array.from(phoenBookMap, ([key, value]) => ({ key, value }))
            .filter(n => n.value.label.toLowerCase().includes(label));
        if (!suggestions) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }

        logger.info(JSON.stringify(suggestions), { event: ServiceEvents.GET_ENTRY_BY_LABEL_SERVICE_FINISHED })
        return suggestions

    }
    async getEntryByName(name: string) {
        logger.info("", { event: ServiceEvents.GET_ENTRY_BY_NAME_SERVICE_STARTED })

        var entry = phoenBookMap.get(name)
        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }
        logger.info(JSON.stringify(entry), { event: ServiceEvents.GET_ENTRY_BY_NAME_SERVICE_FINISHED })
        return entry

    }

    async updateEntry(name: string, data: any) {
        logger.info(`name is ${name}`, { event: ServiceEvents.UPDATE_ENTRY_SERVICE_STARTED })

        var entry: PhoneBook = phoenBookMap.get(name)

        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }
        entry.label = data.label
        entry.value = data.value
        entry.updatedDate = new Date()
        phoenBookMap.set(name, entry)
        logger.info(JSON.stringify(entry), { event: ServiceEvents.UPDATE_ENTRY_SERVICE_FINISHED })

        return entry

    }

    async deletePost(name: string) {
        logger.info(`name is ${name}`, { event: ServiceEvents.DELETE_ENTRY_SERVICE_STARTED })

        const entry = phoenBookMap.delete(name)
        if (!entry) {
            logger.info("", { event: ServiceEvents.ENTRY_NOT_AVAILABLE })
            throw new NotFoundError({ code: 404, message: "Entry not available" })
        }
        logger.info("", { event: ServiceEvents.DELETE_ENTRY_SERVICE_FINISHED })
        return "Entry deleted"

    }
}

export const inMemoryPhoneBookServices = new inMemoryPhoneBookService()