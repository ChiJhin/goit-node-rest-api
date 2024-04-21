import express from "express";

import { getCurrent, logIn, logout, signUp } from "../controllers/userControllers.js";
import { protect, checkUserLogIn, checkUserSingUp } from "../middlewares/authMiddlewares.js"

const router = express.Router()

router.post("/register",  checkUserSingUp , signUp);
router.post("/login", checkUserLogIn, logIn);
router.post("/logout", protect ,logout);
router.get("/current", protect, getCurrent);

export {router};
