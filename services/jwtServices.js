import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

const {SECRET_TOKEN} = process.env

export const createToken = (id) => {
  return jwt.sign({ id }, SECRET_TOKEN, { expiresIn: "2d" });
};

export const checkToken = (token) => {
  if (!token) throw new HttpError(401);
  try {
    const { id } = jwt.verify(token, SECRET_TOKEN);
    return id;
  } catch (error) {
    throw new HttpError(401);
  }
};
