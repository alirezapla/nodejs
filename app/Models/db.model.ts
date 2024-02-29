import { Schema, model, } from 'mongoose'
import Joi from 'joi'

export const CreatePhoneBookschemaValidate = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    label: Joi.string().required(),

})
export const UpdatePhoneBookschemaValidate = Joi.object({
    value: Joi.number().required(),
    label: Joi.string().required(),

})

export interface IPhoneBook {
    value: Number;
    label: string;
    name: string;
    createdDate: Date;
    updatedDate: Date;

}


const phoneBookSchema = new Schema<IPhoneBook>({
    value: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    label: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

// phoneBookSchema.pre('save', function (next) {
//     this.updated_at = Date.now();
//     next();
// });

export const PhoneBook = model<IPhoneBook>('PhoneBook', phoneBookSchema)