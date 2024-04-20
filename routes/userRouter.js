import express from "express";

import { getCurrent, logIn, logout, signUp } from "../controllers/userControllers.js";
import { protect, checkUserDataLogIn, checkUserDataSingUp } from "../middlewares/authMiddlewares.js"

const router = express.Router()

router.post("/register",  checkUserDataSingUp , signUp);
router.post("/login", checkUserDataLogIn, logIn);
router.post("/logout", protect ,logout);
router.get("/current", protect, getCurrent);

export {router};
