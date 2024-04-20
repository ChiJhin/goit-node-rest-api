import express from "express";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";

import { checkFavorite, checkUserBody, checkUserId } from "../middlewares/userMiddlewares.js";

import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.use(protect);
router.get("/", getAllContacts);

router.use("/:id",checkUserId);
router.
route("/:id")
.get(getOneContact)
.delete(deleteContact)
.put(checkUserBody, updateContact); 

router.post("/", createContact);

router.patch("/:id/favourite", checkFavorite, updateStatus); 

export {router};
