import Joi from "joi";
import validate from "../helpers/validate.js";

export const createContactSchema = validate((data) =>
Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com' , 'net'] } }),
    phone: Joi.string().required().min(3).max(30),
})
.validate(data)
);

export const updateContactSchema = validate((data) =>
Joi.object({
    name: Joi.string(), 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com' , 'net'] } }),
    phone: Joi.string(),
})
.validate(data)
);

export const patchContactSchema = validate((data) =>
Joi.object({
    favourite: Joi.boolean().required(),
})
.validate(data)
);