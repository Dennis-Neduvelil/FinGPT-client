import { z } from "zod";

// Strong password rules 
// - at least 6 characters
// - at least one uppercase
// - at least one lowercase
// - at least one number
// - at least one special character
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters") // ✅ Length check
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[^A-Za-z\d]/.test(val), {
    message: "Password must contain at least one special character",
  });

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: passwordSchema,
});

// Signup schema (extends login with confirm password check)
export const signUpSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types for form usage
export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type AuthErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};