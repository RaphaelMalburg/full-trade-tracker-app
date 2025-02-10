import { z } from "zod";

// Regex patterns
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

// Base schemas
export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z.string().regex(PASSWORD_REGEX, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number");
export const phoneSchema = z.string().regex(PHONE_REGEX, "Invalid phone number");

// Auth schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Chart Analysis schemas
export const chartAnalysisSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(500, "Prompt must be less than 500 characters"),
  imageUrl: z.string().url("Invalid image URL"),
});

// Credit Purchase schemas
export const creditPurchaseSchema = z.object({
  packageId: z.string(),
  amount: z.number().positive("Amount must be positive"),
  cost: z.number().positive("Cost must be positive"),
});

// User Preferences schemas
export const userPreferencesSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
  emailMarketing: z.boolean(),
  securityAlerts: z.boolean(),
});
