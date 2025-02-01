import FAQ from "../models/faq.model";
import translateText from "../utils/translate.js";

export const fetchFaqController = async (req, res) => {
  const { lang } = req.query;

  try {
    const faqs = await FAQ.find(); // Fetch all FAQs

    const formattedFaqs = faqs.map((faq) => {
      if (lang && faq.translations[lang]) {
        return {
          question: faq.translations[lang].question || faq.question, // Fallback to English
          answer: faq.translations[lang].answer || faq.answer,
        };
      }
      return faq; // if lang is not present then return the english faq
    });

    res.status(200).json(formattedFaqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};

export const createFaqController = async (req, res) => {
  const { question, answer } = req.body;

  // Validation: Ensure fields are present
  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Both question and answer are required." });
  }

  try {
    const translatedQuestions = await translateText(question);
    const translatedAnswers = await translateText(answer);

    const translations = {};
    Object.keys(translatedQuestions).forEach((lang) => {
      translations[lang] = {
        question: translatedQuestions[lang],
        answer: translatedAnswers[lang],
      };
    });

    const newFaq = await FAQ.create({ question, answer, translations });
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: "Error saving FAQ", error });
  }
};
