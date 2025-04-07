import express from "express";
import { fetchUser } from "../controllers/userController.mjs";

const router = express.Router();

router.get("/:username", fetchUser); // Route to get user by username

export default router;
