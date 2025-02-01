import redis from "../db/redisClient.js";

export const cacheMiddleware = async (req, res, next) => {
  const { lang = "en", id = 0 } = req.query;
  const cacheKey = `faqs_${lang}_${id}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Redis Error:", error);
    next();
  }
};
