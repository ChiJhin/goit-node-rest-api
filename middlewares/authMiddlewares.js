import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import { loginSchema, signUpSchema } from "../schemas/authSchemas.js";
import { checkEmail } from "../services/userServices.js";
import {checkToken } from "../services/jwtServices.js";

export const checkUserDataSingUp = catchAsync(async (req, res, next) => {
    const { value, errors } = signUpSchema(req.body);
    if (errors) throw new HttpError(400, errors.message);
  
    const emailCheck = await checkEmail(value.email);
    if (emailCheck) throw new HttpError(409, "Email in use");
    req.body = value;
  
    next();
  });
  
  export const checkUserDataLogIn = catchAsync(async (req, res, next) => {
    const { value, errors } = loginSchema(req.body);
    if (errors) throw new HttpError(400, errors.message);
  
    req.body = value;
    next();
  });
  
  export const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) throw new HttpError(401);
  
    const id = checkToken(token);
    const user = await User.findById(id);
  
    if (!user || !user.token || user.token !== token) throw new HttpError(401);
    req.user = user;
    next();
  });
  
  