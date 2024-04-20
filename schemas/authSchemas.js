import Joi from "joi";
import validate from "../helpers/validate.js";

export const signUpSchema = validate((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(6),
    })
    .validate(data)
);

export const loginSchema = validate((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(6),
    })
    .validate(data)
);
