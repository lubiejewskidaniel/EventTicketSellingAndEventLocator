import express from "express";
import { loginUser } from "../controllers/userController.mjs";

const router = express.Router();

router.post("/login", loginUser);

export default router;
