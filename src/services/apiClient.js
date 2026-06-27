import {
  API_REQUEST_TIMEOUT_MS,
  API_URL,
  IS_RENDER_API,
  SERVER_WAKE_UP_MESSAGE,
} from "@/constants/apiConfig";
import { tokenStorage } from "@/utils/tokenStorage";

class ApiError extends Error {
  constructor(message, status, data, code) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.code = code;
  }
}

export async function apiClient(endpoint, options = {}) {
  const { params, timeout = API_REQUEST_TIMEOUT_MS, ...fetchOptions } = options;

  let url = `${API_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const query = searchParams.toString();
    if (query) {
      url += `?${query}`;
    }
  }

  const accessToken = tokenStorage.getAccessToken();

  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  if (config.signal) {
    config.signal.addEventListener("abort", () => controller.abort());
  }

  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        data.message || "Request failed",
        response.status,
        data,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "AbortError") {
      throw new ApiError(
        IS_RENDER_API
          ? SERVER_WAKE_UP_MESSAGE
          : "Request timed out. Please try again.",
        0,
        null,
        "TIMEOUT",
      );
    }

    throw new ApiError(
      IS_RENDER_API
        ? SERVER_WAKE_UP_MESSAGE
        : "Unable to reach the server. Check your connection and try again.",
      0,
      null,
      "NETWORK",
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export default apiClient;
