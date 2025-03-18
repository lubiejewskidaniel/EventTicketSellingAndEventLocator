import express from "express";
import { fetchEvents } from "../controllers/eventsController.mjs";

const router = express.Router();
router.get("/:location", fetchEvents);
export default router;
