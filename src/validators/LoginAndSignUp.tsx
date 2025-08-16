import { z } from "zod";

// Strong password regex:
// - at least 6 characters
// - at least one uppercase
// - at least one lowercase
// - at least one number
// - at least one special character
const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(
			passwordRegex,
			"Password must contain upper, lower, number & symbol"
		),
});

export const signUpSchema = loginSchema
	.extend({
		confirmPassword: z.string().min(1, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
