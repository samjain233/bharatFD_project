import translate from "google-translate-api-x";

/**
 * Translates a given text into multiple languages
 * @param {string} text - The text to translate
 * @param {Array} languages - Array of target languages (default: ["hi", "bn", "fr"])
 * @returns {Object} - An object containing translations for each language
 */

const translateText = async (text, languages = ["hi", "bn"]) => {
  const translations = {};

  for (const lang of languages) {
    try {
      const translated = await translate(text, { to: lang });
      translations[lang] = translated.text;
    } catch (error) {
      console.error(`Translation failed for ${lang}:`, error);
      translations[lang] = null;
    }
  }

  return translations;
};

export default translateText;
