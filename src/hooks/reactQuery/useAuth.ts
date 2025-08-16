// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import { type LoginInput, type SignUpInput } from "@/validators";

const loginApi = (data: LoginInput) => apiFetch("/login", { method: "POST", body: JSON.stringify(data) });
const signUpApi = (data: SignUpInput) => apiFetch("/signup", { method: "POST", body: JSON.stringify(data) });

export const useAuth = () => {
    const loginMutation = useMutation({ mutationFn: loginApi });
    const signUpMutation = useMutation({ mutationFn: signUpApi });

    return { loginMutation, signUpMutation };
};