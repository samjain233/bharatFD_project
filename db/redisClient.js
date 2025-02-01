import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  username: "default",
  password: process.env.PASSWORD || null,
});

redis.on("connect", () => console.log("Redis Connected!"));
redis.on("error", (err) => console.error("Redis Error:", err));

export default redis;
