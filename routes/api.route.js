import express from "express";
const router = express.Router();

//get routes for fetching faq
router.get("/faqs", fetchFaqController);


//post routes for insertion of new faq
router.post("/faqs", createFaqController);


export default router;
