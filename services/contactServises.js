import { Contacts } from "../models/contactsModel.js"
import HttpError from "../helpers/HttpError.js";

export const makeUser = (userData, owner) => Contacts.create({...userData, owner})

export const getContacts = (id) => Contacts.find({ owner: id });  

export const deleteChooseContact = (id, owner) => {
    const contact = Contacts.findById(id)
    if (!contact.id === owner) throw new HttpError(409, "Not your contact!")
    Contacts.findOneAndDelete(id)
}

export const updateChooseContact = (id, params, owner) => {
    const contact = Contacts.findById(id)
    if (!contact.id === owner) throw new HttpError(409, "Not your contact!")
    Contacts.findOneAndUpdate(id, params, {new: true});
}

export const changeStatus = (id, value, owner) => {
    const contact = Contacts.findById(id)
    if (!contact.id === owner) throw new HttpError(409, "Not your contact!")
    Contacts.findOneAndUpdate(id, value, {new: true});
}
