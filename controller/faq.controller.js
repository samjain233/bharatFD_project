import FAQ from "../models/faq.model.js";
import translateText from "../utils/translate.js";

export const fetchFaqController = async (req, res) => {
  const { lang, id } = req.query;

  try {
    // If `id` is provided, fetch the specific FAQ by ID
    if (id) {
      const faq = await FAQ.findById(id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found." });
      }

      // If lang is provided, return the translated version
      if (lang && faq.translations[lang]) {
        return res.json({
          question: faq.translations[lang].question || faq.question,
          answer: faq.translations[lang].answer || faq.answer,
        });
      }

      // If lang is not provided, return the FAQ as it is
      return res.json({ question: faq.question, answer: faq.answer });
    }

    const faqs = await FAQ.find(); // Fetch all FAQs

    const formattedFaqs = faqs.map((faq) => {
      if (lang && faq.translations[lang]) {
        return {
          question: faq.translations[lang].question || faq.question, // Fallback to English
          answer: faq.translations[lang].answer || faq.answer,
        };
      }
      return { question: faq.question, answer: faq.answer }; // if lang is not present then return the english faq
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
