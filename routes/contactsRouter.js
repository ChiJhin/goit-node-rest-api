import { Router } from "express";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";

import { validateBody } from "../helpers/validate.js";

import { createContactSchema, patchContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import {  checkFavorite, checkUserId, checkUserData } from "../middlewares/userMiddlewares.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = Router();

router.use(authenticate);
router.get("/", getAllContacts);

router.use("/:id",checkUserId);
router.
route("/:id")
.get(getOneContact)
.delete(deleteContact)
.put(checkUserData, validateBody(updateContactSchema), updateContact); 

router.post("/",validateBody(createContactSchema), createContact);

router.patch("/:id/favourite", validateBody(patchContactSchema), checkFavorite, updateStatus); 

export {router};
