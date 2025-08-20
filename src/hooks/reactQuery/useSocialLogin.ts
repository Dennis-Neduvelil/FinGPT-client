import { usePopupStore } from "@/store";
import { PopupVariant, type AuthResponse } from "@/types";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { ApiError, apiFetch, type ApiResponse } from "@/lib/apiClient";
import type { GoogleAuthInput } from "@/validators";
import { useNavigate } from "react-router-dom";



/**
 * Sends a request to the backend to authenticate a user via Google login.
 *
 * @param data - Google authentication payload (e.g., authorization code or credential token).
 * @returns A promise resolving with the API response containing authentication data (e.g., access token, user info).
 *
 */
const googleLoginApi = (
    data: GoogleAuthInput
): Promise<ApiResponse<AuthResponse>> =>
    apiFetch<AuthResponse>("auth/google", {
        method: "POST",
        body: JSON.stringify(data),
    });

/**
 * Hook that provides social login methods (Google, Apple, etc.)
 */




export const useSocialLogin = () => {
    const showPopup = usePopupStore((state) => state.showPopup);
    const navigate = useNavigate();

    const googleAuthMutation = useMutation<
        ApiResponse<AuthResponse>,
        ApiError,
        GoogleAuthInput
    >({
        mutationFn: googleLoginApi,
        onSuccess: (response) => {
            const token = response?.data?.accessToken;
            if (token) {
                localStorage.setItem("accessToken", token);
            }
            navigate("/");
        },
        onError: (error) => {
            const errorMessage =
                (error.body as { message?: string })?.message ||
                error.message ||
                "Something went wrong!";
            showPopup({
                heading: "Signup Failed!",
                message: errorMessage,
                variant: PopupVariant.ERROR,
            });
        },
    });

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            googleAuthMutation.mutate({ code: response.code })
        },
        onError: (error) => {
            showPopup({
                heading: "Google Login Failed!",
                message: error.error as string,
                variant: PopupVariant.INFO,
            });
        },
        flow: "auth-code", // use auth-code flow (server-side token exchange)
    });

    const appleLogin = () => {
        showPopup({
            heading: "Apple Login Failed!",
            message: "Apple Login Not Implemented Yet",
            variant: PopupVariant.INFO,
        });
    };
    return { googleLogin, appleLogin };
};
