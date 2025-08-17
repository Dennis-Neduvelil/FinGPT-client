import { validateAuth } from "@/utils";
interface HandleLoginProps {
    /** Email entered by the user */
    email: string;
    /** Password entered by the user */
    password: string;
    /** Setter for validation errors */
    setErrors: (errors: Record<string, string>) => void;
    /** React Query mutation for login */
    loginMutation: {
        mutate: (data: { email: string; password: string }) => void;
    };
}

/**
 * Handles user login by validating input and triggering login mutation.
 *
 * @param props - The login details and handlers
 */
export const handleLogin = ({
    email,
    password,
    setErrors,
    loginMutation,
}: HandleLoginProps) => {
    setErrors({});
    const { valid, errors } = validateAuth(false, { email, password });
    if (!valid) {
        setErrors(errors);
        return;
    }
    loginMutation.mutate({ email, password });
};