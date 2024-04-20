import { Router } from "express";

import { logIn, logout, singUp, getCurrent } from "../controllers/userControllers.js";
import { authenticate, checkUserDataLogIn, checkUserDataSingUp } from "../middlewares/authMiddlewares.js";


const router = Router();

router.post("/register", checkUserDataSingUp , singUp);
router.post("/login", checkUserDataLogIn, logIn);
router.post("/logout", authenticate ,logout);
router.get("/current", authenticate, getCurrent);

export {router};
