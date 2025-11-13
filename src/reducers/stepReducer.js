import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetchSteps
export const fetchTotalSteps = createAsyncThunk(
  "steps/fetchTotalSteps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/v1/fetch-all-steps", {
        withCredentials: true,
      });

      const { message, data } = response.data;

      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all steps"
      );
    }
  }
);

// --- COMPLETE STEPS ---

export const completeSteps = createAsyncThunk(
  "user/completeSteps",
  async ({ stepNumber, estateId }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/auth/v1/complete-client-journey/${stepNumber}`,
        { estateId }, // ✅ Always an object
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message, data } = response.data; // ✅ use correct variable

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

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    steps: [],
    count: 0, // array of property objects
    loading: false,
    error: null,
    watchedSteps: {},
  },
  reducers: {
    // Action to mark a step as watched
    markStepWatched: (state, action) => {
      const stepNumber = action.payload;
      state.watchedSteps[stepNumber] = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch total steps
      .addCase(fetchTotalSteps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalSteps.fulfilled, (state, action) => {
        state.loading = false;
        state.steps = action.payload.data || [];
        state.count = action.payload.data.totalSteps;
      })
      .addCase(fetchTotalSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete steps
      .addCase(completeSteps.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeSteps.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(completeSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { markStepWatched } = stepsSlice.actions;
export default stepsSlice.reducer;
