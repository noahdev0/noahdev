import Redis from "ioredis";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
};

// Create Redis client
const redis = new Redis(redisConfig);

// Error handling
redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export const setCache = async (key: string, value: unknown, expiry = 3600) => {
  await redis.set(key, JSON.stringify(value), "EX", expiry);
};

export const getCache = async (key: string) => {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};

export default redis;
