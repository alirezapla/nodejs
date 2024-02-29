
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
export interface PhoneBook {
    value: Number;
    label: string;
    createdDate: Date;
    updatedDate: Date;

}
