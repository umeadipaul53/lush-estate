import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ answer questions
export const answerQuestions = createAsyncThunk(
  "questionaire/answerQuestions",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Sending to backend:", credentials);
      const response = await API.post(
        "/auth/v1/answer-questionaire",
        credentials,
        {
          withCredentials: true,
        }
      );
      console.log("Backend response:", response.data);
      const { message, data } = response.data;

      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit answers"
      );
    }
  }
);

// --- fetch questions ---

export const fetchQuestions = createAsyncThunk(
  "questionaire/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/v1/fetch-all-questions", {
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

const questionaireSlice = createSlice({
  name: "questionaire",
  initialState: {
    question: [],
    count: 0, // array of property objects
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reserve plots
      .addCase(answerQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(answerQuestions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(answerQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload.data.questions;
        state.count = action.payload.data.totalQuestions;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionaireSlice.reducer;
