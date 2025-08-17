export const API_BASE_URL = "http://localhost:4000/";

/**
 * Generic API response type returned by backend.
 * 
 * @template T - Type of the `data` field in the response
 */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

/**
 * Custom API error type with extra fields for status code and response body.
 */
export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

const getToken = () => localStorage.getItem("access-token");

/**
 * Type guard to check if response body has a `message` field.
 */
function hasMessage(body: unknown): body is { message: string } {
  return (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
  );
}

/**
 * Wrapper around fetch API with token injection, JSON parsing,
 * and consistent error handling.
 *
 * @param endpoint - API endpoint relative to `API_BASE_URL`
 * @param options - Fetch request options
 * @returns {Promise<ApiResponse<T>>} Parsed response object
 * @throws {ApiError} if response is not OK (non-2xx)
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const responseBody = (await res.json().catch(() => ({}))) as unknown;

  if (!res.ok) {
    const message = hasMessage(responseBody)
      ? responseBody.message
      : res.statusText;

    throw new ApiError(message, res.status, responseBody);
  }

  return responseBody as ApiResponse<T>;
}