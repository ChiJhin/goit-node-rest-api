import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { createContactSchema, patchContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import { changeStatus, deleteChooseContact, getContacts, makeUser, updateChooseContact} from "../services/contactServises.js";

export const getAllContacts = catchAsync (async (req, res) => {
    const list = await getContacts(req.user.id)  

    res.status(200).json( list); 
});

export const getOneContact = catchAsync(async (req, res) => {
    const getOne = await req.contact;
        
    res.json(getOne).status(200);
    });

export const deleteContact = catchAsync (async (req, res) => {
    const delContact = await deleteChooseContact(req.params.id)

    res.json(delContact).status(200);
});

export const createContact = catchAsync (async (req, res) => {
    const {value, error} = createContactSchema(req.body)

    if(error) throw new HttpError(400)
    
    const newUser = await makeUser(value, req.user.id)

    if(!newUser) {
        return res.status(400).json({ message: 'Contact not created' });
    }

    res.status(201).json(newUser);
});

export const updateContact = catchAsync(async (req, res) => {
    const {value, error} = updateContactSchema(req.body)

    if(error) throw new HttpError(400)

    const update = await updateChooseContact(req.params.id, ...value)

    res.json(update).status(200);
});

export const updateStatus = catchAsync(async (req, res) => {
    const {value, error} = patchContactSchema(req.body)

    if(error) throw new HttpError(400)

    const { id } = req.params;  

    const update = await changeStatus(id, value)

    res.status(200).json(update);
}); 
