import { Types } from "mongoose";

import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";


export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) throw new HttpError(400);
  const contact = await Contacts.findById(id); 
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  req.contact = contact;
  next();
}); 

export const checkUserBody = catchAsync(async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "Body must have at least one field");
  next();
});

export const checkFavorite = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  if (req.body.favourite === undefined)
    throw new HttpError(400, "Favorite field is missing");
  next();
});

