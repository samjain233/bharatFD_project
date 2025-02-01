import express from "express";
import {
  createFaqController,
  fetchFaqController,
} from "../controller/faq.controller.js";
const router = express.Router();

//get routes for fetching faq
router.get("/faqs", fetchFaqController);

//post routes for insertion of new faq
router.post("/faqs", createFaqController);

export default router;
