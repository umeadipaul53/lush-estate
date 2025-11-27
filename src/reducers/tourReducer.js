import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ schedule a tour
export const secheduleTour = createAsyncThunk(
  "tour/secheduleTour",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/v1/request-tour", credentials, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      return rejectWithValue(message);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    returnMessage: null, // message
    loading: false,
    count: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Schedule tour
      .addCase(secheduleTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(secheduleTour.fulfilled, (state, action) => {
        state.loading = false;
        state.returnMessage = action.payload.message;
      })
      .addCase(secheduleTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourSlice.reducer;
