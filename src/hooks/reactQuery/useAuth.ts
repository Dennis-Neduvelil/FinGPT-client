import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { apiFetch, type ApiResponse, ApiError } from "@/lib/apiClient";
import { type LoginInput, type SignUpInput } from "@/validators";
import { usePopupStore } from "@/store";
import { PopupVariant } from "@/types";

/**
 * Response type for login/signup API calls
 */
interface AuthResponse {
  userId: string;
  accessToken: string;
}

/**
 * API function to log in a user
 * @param data - The login credentials (email & password)
 * @returns Promise resolving with API response
 */
const loginApi = (data: LoginInput): Promise<ApiResponse<AuthResponse>> =>
  apiFetch<AuthResponse>("auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * API function to sign up a new user
 * @param data - The sign-up credentials (email, password, name, etc.)
 * @returns Promise resolving with API response
 */
const signUpApi = (data: SignUpInput): Promise<ApiResponse<AuthResponse>> =>
  apiFetch<AuthResponse>("auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

/**
 * Custom React hook for authentication (sign in & sign up).
 * 
 * - Uses React Query's `useMutation` to handle async API calls.
 * - Persists JWT access token in localStorage on success.
 * - Displays error messages via global Popup (Zustand store).
 *
 * @example
 * ```tsx
 * const { loginMutation, signUpMutation } = useAuth();
 *
 * // Login
 * loginMutation.mutate({ email: "test@example.com", password: "123456" });
 *
 * // Signup
 * signUpMutation.mutate({ email: "test@example.com", password: "123456", fullName: "John Doe" });
 * ```
 *
 * @returns Object containing `loginMutation` and `signUpMutation` mutations
 */
export const useAuth = (): {
  loginMutation: UseMutationResult<ApiResponse<AuthResponse>, ApiError, LoginInput>;
  signUpMutation: UseMutationResult<ApiResponse<AuthResponse>, ApiError, SignUpInput>;
} => {
  const showPopup = usePopupStore((state) => state.showPopup);

  const loginMutation = useMutation<
    ApiResponse<AuthResponse>, // success type
    ApiError,                  // error type
    LoginInput                 // variables type
  >({
    mutationFn: loginApi,
    onSuccess: (response) => {
      const token = response?.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
    },
    onError: (error) => {
      const errorMessage =
        (error.body as { message?: string })?.message ||
        error.message ||
        "Something went wrong!";
      showPopup({
        heading: "Signin Failed!",
        message: errorMessage,
        variant: PopupVariant.ERROR,
      });
    },
  });

  const signUpMutation = useMutation<
    ApiResponse<AuthResponse>, 
    ApiError, 
    SignUpInput
  >({
    mutationFn: signUpApi,
    onSuccess: (response) => {
      const token = response?.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
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

  return { loginMutation, signUpMutation };
};