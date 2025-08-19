import "dotenv/config";
import { z } from "zod";

// Normalize env and validate
export const env = z
  .object({
    NODE_ENV: z
      .string()
      .default("DEVELOPMENT")
      .transform((v) => (v || "DEVELOPMENT").toUpperCase())
      .refine((v) => v === "DEVELOPMENT" || v === "PRODUCTION", {
        message:
          "Invalid NODE_ENV. Expected 'DEVELOPMENT' | 'PRODUCTION' (case-insensitive)",
      }),
    KEY: z.string().default(""),
    PORT: z
      .string()
      .default("5001")
      .transform((e) => Number(e)),
    WEBHOOK_BASE_URL: z.string().optional(),
  })
  .parse(process.env);
