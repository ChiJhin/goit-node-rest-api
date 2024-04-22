import { Contacts } from "../models/contactsModel.js"
import HttpError from "../helpers/HttpError.js";

export const makeUser = (userData, owner) => Contacts.create({...userData, owner})

export const getContacts = (id) => Contacts.find({ owner: id });  

export const deleteChooseContact = async (id, owner) => {
    const contact = await Contacts.findById(id)

    if (!contact.owner || contact.owner.toString() !== owner) throw new HttpError(409, "Not your contact!")

    const upContact = Contacts.findOneAndDelete(id)

    return upContact
}

export const updateChooseContact = async (id, params, owner) => {
    const contact = await Contacts.findById(id)

    if (!contact.owner || contact.owner.toString() !== owner) throw new HttpError(409, "Not your contact!")

    const upContact = Contacts.findOneAndUpdate({_id: id},{ $set: params }, {new: true});

    return upContact
}

export const changeStatus = async (id, value, owner) => {
    const contact = await Contacts.findById(id)

    if (!contact.owner || contact.owner.toString() !== owner) throw new HttpError(409, "Not your contact!")

    Contacts.findOneAndUpdate({_id: id},{ $set: value }, {new: true});
}
