export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/** True when the client talks to a hosted API (e.g. Render) that can cold-start. */
export const IS_RENDER_API = API_URL.includes("onrender.com");

/** Shown in UI — typical Render free-tier wake time. */
export const SERVER_WAKE_UP_SECONDS = 45;

/** Fetch timeout — allow cold start to complete before failing. */
export const API_REQUEST_TIMEOUT_MS = 60_000;

export const SERVER_WAKE_UP_MESSAGE =
  "The server is waking up. On the free Render plan this can take up to 45 seconds on the first visit after idle time. Please wait and do not refresh.";
