import { validateAuth } from "@/utils";

/**
 * Handles user signup by validating input and executing the signup mutation.
 *
 * @param params - Parameters required for signup
 * @param params.fullName - User's full name
 * @param params.email - User's email address
 * @param params.password - User's chosen password
 * @param params.confirmPassword - Password confirmation
 * @param params.setErrors - Function to update validation errors
 * @param params.signUpMutation - React Query mutation function for signup
 *
 * @example
 * ```tsx
 * handleSignUp({
 *   fullName,
 *   email,
 *   password,
 *   confirmPassword,
 *   setErrors,
 *   signUpMutation,
 * });
 * ```
 */
export const handleSignUp = ({
    fullName,
    email,
    password,
    confirmPassword,
    setErrors,
    signUpMutation,
}: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    setErrors: (errors: Record<string, string>) => void;
    signUpMutation: {
        mutate: (data: {
            fullName: string;
            email: string;
            password: string;
            confirmPassword: string;
        }) => void;
    };
}) => {
    const { valid, errors } = validateAuth(true, {
        fullName,
        email,
        password,
        confirmPassword,
    });

    if (!valid) {
        setErrors(errors);
        return;
    }

    signUpMutation.mutate({
        fullName,
        email,
        password,
        confirmPassword,
    });
};