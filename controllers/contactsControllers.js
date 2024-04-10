import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
 try {
   const contacts = await Contact.find();
   res.status(200).json(contacts);
 } catch (error) {
    next(error)
 }
};

export const getOneContact = async (req, res) => {
   try {
      const {id} = req.params
      
      const contact = await Contact.findById(id);

      if (!contact) {
         return  res.status(404).json({message: "Not found"})
      }
      res.status(200).json(contact)
   } catch (error) {
      console.log(error)
      
   }
};

export const deleteContact = async (req, res) => {
   try {
      const {id} = req.params
      
      const contact = await Contact.findByIdAndDelete(id)

      if (!contact) {
        return res.status(404).json({message: "Not found"})
      }
      res.sendStatus(200);
   } catch (error) {
      console.log(error)
      
   }
};

export const createContact = async (req, res) => {
   try {
      const createContact = await Contact.create(req.body)

      res.status(201).json(createContact)

   } catch (error) {
      console.log(error)
      
   }
};

export const updateContact = async (req, res) => {

   const {id} = req.params

   const { name, email, phone, favorite } = req.body;

   const update = await Contact.findByIdAndUpdate(id,
      { name, email, phone, favorite },{ new: true },
    );

   if (!update) {
     return res.status(404).json({message: "Not found"})
   }

   res.status(200).json(update)
};

export const updateStatusContact = async (req, res, next) => {
   try {
     const { id } = req.params;
     const { favorite } = req.body;
     const updatedFavorite = await Contact.findByIdAndUpdate(id, 
       { favorite },{ new: true });
 
     if (!updatedFavorite) {
      return res.status(404).json({message: "Not found"})
     }
 
     res.status(200).json(updatedFavorite);
   } catch (error) {
     next(error);
   }
 };