import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetch All Estates for admin
export const fetchAllEstates = createAsyncThunk(
  "estates/fetchAllEstates",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/v1/fetch-all-estates", {
        withCredentials: true,
        params: {
          page,
        },
      });
      const { pagination, data, count } = response.data;
      return { pagination, data, count }; // array of estates objects
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Estates";

      return rejectWithValue(message);
    }
  }
);

// --- fetch all estates for users ---
export const fetchEstateUser = createAsyncThunk(
  "estates/fetchEstateUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/v1/all-estates", {
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

// --- create estate ---
export const createEstate = createAsyncThunk(
  "estates/createEstate",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/admin/v1/create-estate", credentials, {
        withCredentials: true,
      });

      const { message, estate } = response.data; // ✅ use correct variable

      return { message, estate };
    } catch (error) {
      const errData = error.response?.data;
      return rejectWithValue(errData); // pass the full object
    }
  }
);

// --- select estate for a user ---
export const selectEstate = createAsyncThunk(
  "estates/selectEstate",
  async (estateId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/v1/fetch-estate/${estateId}`, {
        withCredentials: true,
      });

      const { message, data } = response.data; // ✅ use correct variable
      localStorage.setItem("estateId", data.estateId);
      return { message, data };
    } catch (error) {
      const errData = error.response?.data;
      return rejectWithValue(errData); // pass the full object
    }
  }
);

// --- Check if a user has submitted a questionaire for an estate
export const checkQuestionaireAccess = createAsyncThunk(
  "estates/checkQuestionaireAccess",
  async (estateId, { rejectWithValue }) => {
    try {
      const res = await API.post(
        `/auth/v1/check-questionaire-access/${estateId}`,
        {
          withCredentials: true,
        }
      );

      const { message, proceed } = res.data;
      return { message, proceed };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const estatesSlice = createSlice({
  name: "estates",
  initialState: {
    items: [], // array of estate objects
    estate: {},
    estateId: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    count: 0,
    loading: false,
    error: null,
    proceed: false,
  },
  reducers: {
    restoreEstate(state) {
      const savedId = localStorage.getItem("estateId");
      if (savedId) {
        state.estateId = savedId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch ALL Estates
      .addCase(fetchAllEstates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEstates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.count = action.payload.count;
      })
      .addCase(fetchAllEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch all estates for users
      .addCase(fetchEstateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEstateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchEstateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create estate
      .addCase(createEstate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEstate.fulfilled, (state, action) => {
        state.loading = false;
        state.estate = action.payload.estate;
      })
      .addCase(createEstate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // select estate
      .addCase(selectEstate.pending, (state) => {
        state.loading = true;
      })
      .addCase(selectEstate.fulfilled, (state, action) => {
        state.loading = false;
        state.estateId = action.payload.data.estateId;
        state.estate = action.payload.data.estate;
      })
      .addCase(selectEstate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Check if a user has submitted a questionaire for an estate
      .addCase(checkQuestionaireAccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkQuestionaireAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.proceed = action.payload.proceed;
      })
      .addCase(checkQuestionaireAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { restoreEstate } = estatesSlice.actions;
export default estatesSlice.reducer;
