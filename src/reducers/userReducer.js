// src/reducers/userReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";
import {
  setAccessToken,
  clearAccessToken,
  getAccessToken,
} from "../tokenStore";

// ✅ Helper to persist user object
const persistUser = (data) => {
  try {
    if (data) localStorage.setItem("user", JSON.stringify(data));
    else localStorage.removeItem("user");
  } catch {}
};

// ---------------------------------------------------------
// ✅ Start Journey (email only)
// ---------------------------------------------------------
export const startJourney = createAsyncThunk(
  "user/startJourney",
  async (email, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/auth/v1/start-client-journey",
        { email },
        { withCredentials: true }
      );

      const { data, accessToken } = response.data;

      if (accessToken) setAccessToken(accessToken);
      persistUser(data);

      return { token: accessToken, user: data };
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        error.message ||
        "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

// ---------------------------------------------------------
// ✅ Start Journey (email + name + phone)
// ---------------------------------------------------------
export const startJourneyWithName = createAsyncThunk(
  "user/startJourneyWithName",
  async ({ email, name, phone }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/auth/v1/start-client-journey",
        { email, name, phone },
        { withCredentials: true }
      );

      const { data, accessToken } = response.data;

      if (accessToken) setAccessToken(accessToken);
      persistUser(data);

      return { token: accessToken, user: data };
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        error.message ||
        "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

// ---------------------------------------------------------
// ✅ Admin Login
// ---------------------------------------------------------
export const loginAdmin = createAsyncThunk(
  "user/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/v1/login", credentials, {
        withCredentials: true,
      });

      const { accessToken, data } = res.data;

      if (accessToken) setAccessToken(accessToken);
      persistUser(data);

      return { token: accessToken, user: data };
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        error.message ||
        "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

// ---------------------------------------------------------
// ✅ INITIAL STATE
// ---------------------------------------------------------
const storedToken = getAccessToken();
let storedUser = null;

try {
  const userData = localStorage.getItem("user");
  storedUser = userData ? JSON.parse(userData) : null;
} catch {
  localStorage.removeItem("user");
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser,
    isAuthenticated: !!storedToken,
    token: storedToken,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;

      clearAccessToken();
      persistUser(null);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Start Journey
      .addCase(startJourney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startJourney.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(startJourney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Start Journey with Name
      .addCase(startJourneyWithName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startJourneyWithName.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(startJourneyWithName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearError } = userSlice.actions;
export default userSlice.reducer;
