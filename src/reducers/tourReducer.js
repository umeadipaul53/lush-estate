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

//--- FETCH ALL TOUR REQUESTS
export const getAllTourRequests = createAsyncThunk(
  "tour/getAllTourRequests",
  async ({ status, page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/v1/fetch-all-tours", {
        withCredentials: true,
        params: {
          status,
          page,
        },
      });

      const { count, pagination, data } = response.data;
      return { count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tour requests"
      );
    }
  }
);

//--- SETTLE TOUR REQUEST ---
export const settleTourRequest = createAsyncThunk(
  "tour/settleTourRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/admin/v1/settle-tours/${id}`,
        {},
        { withCredentials: true }
      );

      const { message } = response.data;
      return { message }; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle favourite"
      );
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    returnMessage: null, // message
    loading: false,
    allTours: [],
    tourNumber: 0,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
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
      })

      //--- GET TOUR REQUESTS ---
      .addCase(getAllTourRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTourRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.allTours = action.payload.data;
        state.pagination = action.payload.pagination;
        state.tourNumber = action.payload.count;
      })
      .addCase(getAllTourRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- SETTLE TOURS---
      .addCase(settleTourRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(settleTourRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(settleTourRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourSlice.reducer;
