import express from "express";
import { fetchTickets } from "../controllers/ticketsController.mjs";

const router = express.Router();
router.get("/:eventID", fetchTickets);
export default router;
