import express from "express";

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";

import { checkFavorite, checkUserData, checkUserId } from "../middlewares/userMiddlewares.js";

import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.use(protect);
router.get("/", getAllContacts);

router.use("/:id",checkUserId);
router.
route("/:id")
.get(getOneContact)
.delete(deleteContact)
.put(checkUserData, updateContact); 

router.post("/", createContact);

router.patch("/:id/favorite", checkFavorite, updateStatus); 

export {router};
