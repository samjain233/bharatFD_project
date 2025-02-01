import express from "express";
import {
  createFaqController,
  fetchFaqController,
} from "../controller/faq.controller.js";
import { cacheMiddleware } from "../middleware/redis.middleware.js";
const router = express.Router();

//get routes for fetching faq
router.get("/faqs", cacheMiddleware, fetchFaqController);

//post routes for insertion of new faq
router.post("/faqs", createFaqController);

export default router;
