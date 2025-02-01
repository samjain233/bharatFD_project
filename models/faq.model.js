import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      translations: {
        hi: { question: String, answer: String },
        bn: { question: String, answer: String }
      },
    }
  );
  
  const FAQ = mongoose.model("FAQ", faqSchema);
  export default FAQ;
