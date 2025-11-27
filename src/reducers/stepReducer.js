import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetchSteps
export const fetchTotalSteps = createAsyncThunk(
  "steps/fetchTotalSteps",
  async (estateId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/v1/fetch-all-steps/${estateId}`, {
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
    estate: null, // full estate object from backend
    steps: [], // ordered steps array
    count: 0,
    loading: false,
    error: null,
    watchedSteps: {}, // { [stepNumber]: true }
  },
  reducers: {
    markStepWatched: (state, action) => {
      const { stepNumber, videosWatched } = action.payload;
      state.watchedSteps[stepNumber] = {
        videosWatched,
        completed: videosWatched.every((v) => v),
      };
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
        const steps = (action.payload.data?.steps || [])
          .slice()
          .sort((a, b) => a.stepNumber - b.stepNumber);
        state.steps = steps;
        state.count = steps.length;
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
        const stepNumber = action.meta.arg.stepNumber; // ✅ use arg, not backend
        // Mark all videos watched as completed
        if (state.watchedSteps[stepNumber]) {
          state.watchedSteps[stepNumber].completed = true;
          state.watchedSteps[stepNumber].videosWatched = state.watchedSteps[
            stepNumber
          ].videosWatched.map(() => true);
        } else {
          state.watchedSteps[stepNumber] = {
            videosWatched: [],
            completed: true,
          };
        }
      })
      .addCase(completeSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { markStepWatched } = stepsSlice.actions;
export default stepsSlice.reducer;
