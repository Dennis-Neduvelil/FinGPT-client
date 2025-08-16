import { loginSchema, signUpSchema } from "@/validators";

export type AuthErrors = { email?: string; password?: string; confirmPassword?: string };

export const validateAuth = (
  isSignUp: boolean,
  data: { email: string; password: string; confirmPassword?: string }
): { valid: boolean; errors: AuthErrors } => {
  const errors: AuthErrors = {};

  if (isSignUp) {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((e) => {
        if (e.path[0]) errors[e.path[0] as keyof AuthErrors] = e.message;
      });
      return { valid: false, errors };
    }
    return { valid: true, errors: {} };
  } else {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((e) => {
        if (e.path[0]) errors[e.path[0] as keyof AuthErrors] = e.message;
      });
      return { valid: false, errors };
    }
    return { valid: true, errors: {} };
  }
};