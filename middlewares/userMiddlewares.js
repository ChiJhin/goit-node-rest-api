import { Types } from "mongoose";

import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) throw new HttpError(400);

  const contact = await Contacts.findById(id); 
  
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  
  req.contact = contact;
  
  next();
}); 

export const checkUserData = (req, res, next) => {
  if (!Object.keys(req.body).length) throw new HttpError(400, "Data must have one cheange");
  
    next();
};

export const checkFavorite = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const contact = await Contacts.findById(id);
  
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  
  if (req.body.favourite === undefined) throw new HttpError(400, "Favorite is missing");
  
    next();
});

export const checkCreateUserData = (req, res, next) => {
  const {value, error} = createContactSchema(req.body)

  if(error) throw new HttpError(400)

  req.body = value
  
    next();
};
