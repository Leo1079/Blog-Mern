import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyToken,
} from "../Controllers/Auth.controllers.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {authRequired} from '../middlewares/authRequired.js'

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequired, logout);
router.get("/verify",verifyToken);

export default router;
