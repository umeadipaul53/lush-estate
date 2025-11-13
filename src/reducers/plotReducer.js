import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ reserve plots
export const reservePlots = createAsyncThunk(
  "plots/reservePlots",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Sending to backend:", credentials);
      const response = await API.patch("/auth/v1/reserve-plot", credentials, {
        withCredentials: true,
      });
      console.log("Backend response:", response.data);
      const { message, data } = response.data;

      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reserve plots"
      );
    }
  }
);

// --- fetch plots ---

export const fetchPlots = createAsyncThunk(
  "plots/fetchPlots",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/v1/fetch-all-plots", {
        withCredentials: true,
      });

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

const plotsSlice = createSlice({
  name: "plots",
  initialState: {
    plots: [],
    count: 0, // array of property objects
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reserve plots
      .addCase(reservePlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(reservePlots.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(reservePlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch plots
      .addCase(fetchPlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlots.fulfilled, (state, action) => {
        state.loading = false;
        state.plots = action.payload.data.plots;
        state.count = action.payload.data.totalPlots;
      })
      .addCase(fetchPlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default plotsSlice.reducer;
