// src/tokenStore.js
// Simple in-memory + localStorage token store.
// Keeps a single source of truth (in-memory) and mirrors to localStorage.

let accessToken = null;

// initialize from localStorage (if available)
try {
  const t = localStorage.getItem("token");
  accessToken = t || null;
} catch (err) {
  // localStorage might throw in some environments — fail gracefully
  accessToken = null;
}

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token || null;
  try {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  } catch (err) {
    // ignore localStorage failures
  }
};

export const clearAccessToken = () => {
  accessToken = null;
  try {
    localStorage.removeItem("token");
  } catch (err) {}
};
