import FAQ from "../models/faq.model";
import translateText from "../utils/translate.js";

export const fetchFaqController = async (req, res) => {};

export const createFaqController = async (req, res) => {
  const { question, answer } = req.body;

  // Validation: Ensure fields are present
  if (!question || !answer) {
    return res.status(400).json({ message: "Both question and answer are required." });
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
