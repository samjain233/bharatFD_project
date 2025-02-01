import request from "supertest";
import app from "../app.js"; // Your Express app
import redis from "../config/redisClient.js"; // Redis Client
import FAQ from "../models/faq.js"; // Mongoose Model

// Mock Redis for testing
jest.mock("../config/redisClient.js", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe("FAQ API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * ✅ Test GET /api/faqs
   */
  test("GET /api/faqs should return FAQs from cache if available", async () => {
    const cachedData = JSON.stringify([
      { question: "Test Q?", answer: "Test A" },
    ]);

    // Mock Redis cache
    redis.get.mockResolvedValueOnce(cachedData);

    const res = await request(app).get("/api/faqs");

    expect(res.status).toBe(200);
    expect(redis.get).toHaveBeenCalledWith("faqs_en");
    expect(res.body).toEqual(JSON.parse(cachedData));
  });

  test("GET /api/faqs should fetch from DB when cache is empty", async () => {
    redis.get.mockResolvedValueOnce(null);

    // Mock DB response
    jest
      .spyOn(FAQ, "find")
      .mockResolvedValueOnce([{ question: "DB Q?", answer: "DB A" }]);

    const res = await request(app).get("/api/faqs");

    expect(res.status).toBe(200);
    expect(FAQ.find).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalledWith(
      "faqs_en",
      expect.any(String),
      "EX",
      3600
    );
    expect(res.body).toEqual([{ question: "DB Q?", answer: "DB A" }]);
  });

  /**
   * ✅ Test POST /api/faqs
   */
  test("POST /api/faqs should validate request body", async () => {
    const res = await request(app).post("/api/faqs").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Question and Answer are required!");
  });

  test("POST /api/faqs should save FAQ and clear cache", async () => {
    redis.set.mockResolvedValueOnce(null);

    // Mock DB save
    jest.spyOn(FAQ.prototype, "save").mockResolvedValueOnce({
      question: "New Q?",
      answer: "New A",
    });

    const res = await request(app).post("/api/faqs").send({
      question: "New Q?",
      answer: "New A",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("FAQ added successfully!");
    expect(redis.set).toHaveBeenCalledWith(
      "faqs_en",
      expect.any(String),
      "EX",
      3600
    );
  });
});
