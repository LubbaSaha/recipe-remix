import type { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import validator from "validator";
import { useVectorRecipe } from "@/hooks/useVectorRecipes"; // vector search hook

// max 10 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 1-minute
});

const cache = new Map(); // in-memory cache
const MAX_CACHE_SIZE = 100; // max cache entries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // identify client IP
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    // rate limit by IP
    await rateLimiter.consume(ip as string);

    // only allow GET and POST
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // sanitize and validate query
    const rawQuery = (req.query.q || req.body.q || "").toString();

    if (!validator.isLength(rawQuery, { min: 1, max: 100 })) {
      return res
        .status(400)
        .json({ error: "Query must be between 1 and 100 characters" });
    }

    if (!validator.matches(rawQuery, /^[a-zA-Z0-9\s]+$/)) {
      console.warn("Suspicious query:", {
        ip,
        query: rawQuery,
        time: new Date().toISOString(),
      });
      return res
        .status(400)
        .json({ error: "Query contains invalid characters" });
    }

    const query = validator.escape(rawQuery.toLowerCase().trim());

    if (!query) {
      return res.status(400).json({ error: "Empty query" });
    }

    // set security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // cache check
    if (cache.has(query)) {
      console.log("Cache hit for query:", query);
      return res.status(200).json({ results: cache.get(query) });
    }

    // call vector search hook to get results
    const results = useVectorRecipe(query).slice(0, 10); // limit to top 10 results

    if (cache.size >= MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey); // evict oldest cache entry
    }

    // store in cache
    cache.set(query, results);

    console.log("Cache miss for query:", query);

    return res.status(200).json({ results });
  } catch (err) {
    // too many requests error
    return res.status(429).json({ error: "Too many requests" });
  }
}
