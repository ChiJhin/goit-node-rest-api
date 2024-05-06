import { emailSchema } from '../schemas/resetSchemas.js';
import HttpError from '../helpers/HttpError.js';

export const checkEmailVerification = (req, res, next) => {
  const { value, errors } = emailSchema(req.body);
  if (errors) throw new HttpError(400, errors);
  req.body = value;
  next();
};
