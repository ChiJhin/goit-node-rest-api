import HttpError from "./HttpError.js";

export const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };

  return func;
};



export const validateUser = (schema) => (data) => {
  const { error, value } = schema(data);

  if (!error) return { value };

  return {
    value,
    errors: error.details.map((err) => err.message),
  };
};
