import type { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";
import validator from "validator";
import { useVectorRecipe } from "@/hooks/useVectorRecipes"; // vector search hook

// max 10 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 1-minute
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // identify client IP
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    // rate limit by IP
    await rateLimiter.consume(ip as string);

    // only allow GET and POST
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // sanitize and validate query
    const rawQuery = (req.query.q || req.body.q || "").toString();
    const query = validator.escape(rawQuery).slice(0, 100); // escape HTML, limit length

    if (!query) {
      return res.status(400).json({ error: "Empty query" });
    }

    // set security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // call vector search hook to get results
    const results = useVectorRecipe(query);

    return res.status(200).json({ results });
  } catch (err) {
    // too many requests error
    return res.status(429).json({ error: "Too many requests" });
  }
}
